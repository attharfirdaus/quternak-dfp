import { Category } from '../entities/Category'
import { Product } from '../entities/Product'
import { isAdmin } from '../middleware/isAdmin'
import { Arg, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

@InputType()
class CreateProductInput {
  @Field()
  title: string

  @Field(() => [Number])
  price!: number[]

  @Field(() => [String], {nullable: true})
  variant: string[]

  @Field()
  type: string

  @Field()
  description: string

  @Field()
  categoryId!: number

  @Field()
  location: string

  @Field(() => [String], {nullable: true})
  pictureUrl: string[]

  @Field()
  status: 'not sold' | 'sold'
}

@Resolver()
export class ProductResolver {
  @Query(() => [ Product ])
  async products(): Promise<Product[]> {
    return await Product.find({ relations: ['category'] })
  }

  @Query(() => Product)
  async productById(
    @Arg('id') id: number
  ): Promise<Product> {
    const product = await Product.findOne(id)

    if (!product) {
      throw new Error('Cannot find product')
    }

    return product
  }

  @Mutation(() => Product)
  @UseMiddleware(isAdmin)
  async createProduct(
    @Arg('input', () => CreateProductInput) input: CreateProductInput
  ): Promise<Product> {
    const category = await Category.findOne(input.categoryId)
    if(!category) {
      throw new Error ('invalid category ID')
    }

    const createdProduct = await Product.create({ ...input, category }).save()

    return createdProduct
  }
}