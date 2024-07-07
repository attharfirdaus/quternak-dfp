import { MyContext } from '../types'
import { Category } from '../entities/Category'
import { Product } from '../entities/Product'
import { isAdmin } from '../middleware/isAdmin'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { User } from '../entities/User'

@InputType()
class CreateProductInput {
  @Field()
  title: string

  @Field(() => [Number])
  price!: number[]

  @Field(() => [String], { nullable: true })
  variant: string[]

  @Field(() => String, { nullable: true })
  type: string

  @Field()
  description: string

  @Field()
  categoryId!: number

  @Field()
  location: string

  @Field(() => [String], { nullable: true })
  pictureUrl: string[]

  @Field()
  status: 'not sold' | 'sold'
}

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await Product.find({ relations: ['category', 'seller'] })
  }

  @Query(() => Product)
  async productById(@Arg("id") id: number): Promise<Product> {
    const product = await Product.findOne(id, { relations: ['category', 'seller'] })

    if (!product) {
      throw new Error('Cannot find product')
    }

    return product
  }

  @Mutation(() => Product)
  @UseMiddleware(isAdmin)
  async createProduct(
    @Arg("input", () => CreateProductInput) input: CreateProductInput,
    @Ctx() { req }: MyContext
  ): Promise<Product> {
    const category = await Category.findOne(input.categoryId)
    const seller = await User.findOne(req.session.userId)
    if (!category) {
      throw new Error('invalid category ID')
    }

    const createdProduct = await Product.create({ ...input, category, seller }).save()

    return createdProduct
  }
}
