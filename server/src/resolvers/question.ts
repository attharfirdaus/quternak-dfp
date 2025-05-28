import { isAdmin } from '../middleware/isAdmin'
import { Arg, Field, InputType, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Question } from '../entities/Question'

@InputType()
class QuestionInput{
  @Field()
  question: string

  @Field()
  answerExpectation: string
}

@Resolver()
export class QuestionResolver{
  @Query(() => [Question])
  async questions(): Promise<Question[]> {
    return await Question.find()
  }

  @Mutation(() => Question)
  @UseMiddleware(isAdmin)
  async createQuestion(
    @Arg('input') input: QuestionInput
  ): Promise<Question> {
    return await Question.create({ ...input }).save()
  }
}