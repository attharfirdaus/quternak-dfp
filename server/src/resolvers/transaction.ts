import { Transaction } from '../entities/Transaction'
import { isAdmin } from '../middleware/isAdmin'
import { isAuth } from '../middleware/isAuth'
import { MyContext } from '../types'
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { TransactionProduct } from '../entities/TransactionProduct'
import { Product } from '../entities/Product'
import { nanoid } from 'nanoid'
import { User } from '../entities/User'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

@Resolver()
export class TransactionResolver {
  @Query(() => [Transaction])
  @UseMiddleware(isAdmin)
  async transactions(): Promise<Transaction[]> {
    return await Transaction.find({
      relations: [
        'transactionProduct',
        'transactionProduct.product',
        'transactionProduct.product.category',
        'transactionProduct.product.seller',
        'user',
      ],
    })
  }

  @Query(() => Transaction)
  @UseMiddleware(isAdmin)
  async transactionById(
    @Arg("id", () => Int) id: number
  ): Promise<Transaction | undefined> {
    return await Transaction.findOne(id, {
      relations: [
        'transactionProduct',
        'transactionProduct.product',
        'transactionProduct.product.category',
        'transactionProduct.product.seller',
        'user',
      ],
    })
  }

  @Query(() => [Transaction])
  @UseMiddleware(isAuth)
  async myTransactions(@Ctx() { req }: MyContext): Promise<Transaction[]> {
    return await Transaction.find({
      where: {
        userId: req.session.userId,
      },
      relations: [
        'transactionProduct',
        'transactionProduct.product',
        'transactionProduct.product.category',
        'transactionProduct.product.seller',
        'user',
      ],
    })
  }

  @Query(() => Transaction)
  @UseMiddleware(isAuth)
  async myTransactionById(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | undefined> {
    return await Transaction.findOne({
      where: {
        userId: req.session.userId,
        id: id,
      },
      relations: [
        'transactionProduct',
        'transactionProduct.product',
        'transactionProduct.product.category',
        'transactionProduct.product.seller',
        'user',
      ],
    })
  }

  @Query(() => Transaction)
  @UseMiddleware(isAuth)
  async myTransactionByToken(
    @Arg("transactionToken", () => String) transactionToken: string,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | undefined> {
    return await Transaction.findOne({
      where: {
        userId: req.session.userId,
        transactionToken: transactionToken,
      },
      relations: [
        'transactionProduct',
        'transactionProduct.product',
        'transactionProduct.product.category',
        'transactionProduct.product.seller',
        'user',
      ],
    })
  }

  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  async createTransaction(
    @Arg("productId", () => Int) productId: number,
    @Arg("productPrice", () => Int) productPrice: number,
    @Arg("productQuantity", () => Int) productQuantity: number,
    @Arg("productVariantIndex", () => Int, { nullable: true })
    productVariantIndex: number,
    @Ctx() { req }: MyContext
  ): Promise<Transaction> {
    const user = await User.findOne(req.session.userId)
    const product = await Product.findOne(productId)
    if (!product) {
      throw new Error('cannot find product')
    }

    const transactionToken = `QU-${nanoid(4)}-${nanoid(8)}`
    const grossAmount = productPrice * productQuantity
    const authString = btoa(`${process.env.MIDTRANS_SERVER_KEY}:`)
    const payload = {
      transaction_details: {
        order_id: transactionToken,
        gross_amount: grossAmount,
      },
      product_details: {
        id: productId,
        title: product.title,
        price: productPrice,
        quantity: productQuantity,
        variant: product.variant[productVariantIndex],
      },
      customer_details: {
        name: user?.name,
        address: user?.addres,
        profilePictureUrl: user?.profilePictureUrl,
        phoneNumber: user?.phoneNumber,
      },
      callbacks: {
        finish: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
        error: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
        pending: `${process.env.WEB_URL}/order-status?transaction_token=${transactionToken}`,
      },
    }

    const midtransAppUrl = process.env.MIDTRANS_APP_URL
    if (!midtransAppUrl) {
      throw new Error('MIDTRANS_APP_URL environment variable is not set')
    }
    const response = await fetch(`${midtransAppUrl}/snap/v1/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (response.status !== 201) {
      console.error('Failed to create transaction:', data)
      throw new Error('Failed to create transaction')
    }

    console.log('Midtrans response:', data)

    if (!data.token || !data.redirect_url) {
      console.error('Unexpected Midtrans response format:', data)
      throw new Error(
        'Failed to create transaction: Unexpected response format'
      )
    }

    const createdTransaction = Transaction.create({
      transactionToken,
      total: grossAmount,
      status: 'pending',
      userId: user?.id,
      snapToken: data.token,
      snapRedirectUrl: data.redirect_url,
      paymentMethod: '',
      quantity: productQuantity,
      price: productPrice,
      variantIndex: productVariantIndex,
    })
    const savedTransaction = await createdTransaction.save()

    const createdTransactionProduct = TransactionProduct.create({
      transaction: savedTransaction,
      productId: productId,
    })
    await createdTransactionProduct.save()

    return savedTransaction
  }

  updateStatusBasedOnMidtransResponse = async (
    transactionToken: any,
    data: any
  ) => {
    const hash = crypto
      .createHash('sha512')
      .update(
        `${transactionToken}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
      )
      .digest('hex')
    if (data.signature_key !== hash) {
      return {
        status: 'error',
        message: 'invalid signature key',
      }
    }

    let responseData = null
    const transactionStatus = data.transaction_status
    const fraudStatus = data.fraud_status

    if (transactionStatus === 'capture') {
      if (fraudStatus === 'accept') {
        const transaction = await Transaction.findOne({
          where: {
            transactionToken: transactionToken,
          },
        })
        if (!transaction) {
          throw new Error('transaction not found')
        }
        await Transaction.update(
          {
            transactionToken: transactionToken,
          },
          {
            status: 'paid',
            paymentMethod: data.payment_type,
          }
        )
        await transaction.reload()
        responseData = transaction
      }
    } else if (transactionStatus === 'settlement') {
      const transaction = await Transaction.findOne({
        where: {
          transactionToken: transactionToken,
        },
      })
      if (!transaction) {
        throw new Error('transaction not found')
      }
      await Transaction.update(
        {
          transactionToken: transactionToken,
        },
        {
          status: 'paid',
          paymentMethod: data.payment_type,
        }
      )
      await transaction.reload()
      responseData = transaction
    } else if (
      transactionStatus === 'cancel' ||
      transactionStatus === 'deny' ||
      transactionStatus === 'expire'
    ) {
      const transaction = await Transaction.findOne({
        where: {
          transactionToken: transactionToken,
        },
      })
      if (!transaction) {
        throw new Error('transaction not found')
      }
      await Transaction.update(
        {
          transactionToken: transactionToken,
        },
        {
          status: 'canceled',
        }
      )
      await transaction.reload()
      responseData = transaction
    } else if (transactionStatus === 'pending') {
      const transaction = await Transaction.findOne({
        where: {
          transactionToken: transactionToken,
        },
      })
      if (!transaction) {
        throw new Error('transaction not found')
      }
      await Transaction.update(
        {
          transactionToken: transactionToken,
        },
        {
          status: 'pending',
        }
      )
      await transaction.reload()
      responseData = transaction
    }

    return {
      status: 'success',
      data: responseData,
    }
  }

  @Mutation(() => Transaction)
  @UseMiddleware(isAuth)
  async updateTransactionStatus(
    @Arg("token", () => String) token: string,
    @Arg("status", () => String) status: 'paid' | 'canceled' | 'pending',
    @Arg("quantity", () => Int) quantity: number,
    @Arg("variantIndex", () => Int) variantIndex: number,
    @Ctx() { req }: MyContext
  ): Promise<Transaction | undefined> {
    const transaction = await Transaction.findOne({
      where: {
        transactionToken: token,
      },
      relations: ['transactionProduct', 'transactionProduct.product'],
    })

    if (transaction?.userId !== req.session.userId) {
      throw new Error('you are not authorized to this transaction')
    }

    await Transaction.update(
      {
        transactionToken: token,
      },
      {
        status: status,
      }
    )

    if (status === 'paid') {
      for (const transactionProduct of transaction.transactionProduct) {
        const product = transactionProduct.product
        if (product) {
          product.stock[variantIndex] -= quantity
          await product.save()
        }
      }
    }

    await transaction.reload()
    return transaction
  }

  @Mutation(() => String)
  async midtransWebhook(
    @Arg("data", () => String) data: string
  ): Promise<string> {
    const midtransData = JSON.parse(data)
    const transactionToken = midtransData.order_id
    await this.updateStatusBasedOnMidtransResponse(
      transactionToken,
      midtransData
    )
    return 'webhook received and processed'
  }
}
