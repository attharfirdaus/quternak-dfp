import { Box, HStack, useToast } from '@chakra-ui/react'
import TransactionUserProductDetail from '../../components/transaction/transactionUserProductDetail'
import TransactionPriceDetail from '../../components/transaction/transactionPriceDetail'
import {
  useCreateTransactionMutation,
  useUpdateTransactionStatusMutation,
} from '../../generated/graphql'
import type { Transaction } from '../../generated/graphql'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/layout'
import useSnap from '../../utils/hooks/useSnap'
import { useCallback, useEffect, useState } from 'react'

export default function Transaction() {
  const toast = useToast()
  const router = useRouter()
  const [snapShow, setSnapShow] = useState(false)
  const { snapEmbed } = useSnap()
  const queryId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : 0
  const [cart, setCart] = useState(null)

  const getCart = useCallback(async () => {
    const cart = await localStorage.getItem('cart')
    if (cart) {
      setCart(JSON.parse(cart))
    } else {
      setCart(null)
    }
  }, [])

  const [, createTransaction] = useCreateTransactionMutation()
  const [, updateTransactionStatus] = useUpdateTransactionStatusMutation()
  function handlePayment() {
    createTransaction({
      productId: queryId,
      productPrice: cart?.productPrice,
      productQuantity: cart?.productQuantity,
      productVariantIndex: cart?.productVariantIndex,
    }).then(async (resultData) => {
      if (resultData.error) {
        toast({
          title: 'Error',
          description: 'Gagal membuat transaksi',
          status: 'error',
          position: 'top',
          duration: 5000,
        })
      } else {
        await localStorage.removeItem('cart')
        setSnapShow(true)
        snapEmbed(
          resultData.data.createTransaction.snapToken,
          'snap-container',
          {
            onSuccess: async function (result: any) {
              console.log('success', result)
              await updateTransactionStatus({
                token: resultData?.data?.createTransaction?.transactionToken,
                status: 'paid',
                quantity: resultData?.data?.createTransaction?.quantity,
                variantIndex: resultData?.data?.createTransaction?.variantIndex
              })
              router.push(
                `/order-status?transaction_token=${resultData?.data?.createTransaction?.transactionToken}`
              )
              setSnapShow(false)
            },
            onPending: function (result: any) {
              console.log('pending', result)
              router.push(
                `/order-status?transaction_token=${resultData.data.createTransaction.transactionToken}`
              )
              setSnapShow(false)
            },
            onClose: function () {
              router.push(
                `/order-status?transaction_token=${resultData.data.createTransaction.transactionToken}`
              )
              setSnapShow(false)
            },
          }
        )
      }
    })
  }

  useEffect(() => {
    getCart()
  }, [getCart])

  return (
    <>
      <Layout>
        {!snapShow && (
          <>
            <HStack w="full" spacing="32px" p="80px">
              <TransactionUserProductDetail transaction={cart} />
              <TransactionPriceDetail
                transaction={cart}
                handlePayment={handlePayment}
              />
            </HStack>
          </>
        )}
        <Box id="snap-container" w='full'></Box>
      </Layout>
    </>
  )
}
