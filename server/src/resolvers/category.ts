import { isAdmin } from '../middleware/isAdmin'
import { Category } from '../entities/Category'
import { Arg, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'

@InputType()
class CategoryInput {
  @Field()
  name: string
}

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await Category.find()
  }

  @Mutation(() => Category)
  @UseMiddleware(isAdmin)
  async createCategory(
    @Arg('input') input: CategoryInput
  ): Promise<Category> {
    return await Category.create({ ...input }).save()
  }
}