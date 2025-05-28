import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { Question } from '../entities/Question'
import { Answer } from '../entities/Answer'

@InputType()
class AnswerInput{
  @Field()
  answer: string

  @Field()
  questionId: string
}

@Resolver()
export class AnswerResolver{
  @Query(() => [Answer])
  async answers(): Promise<Answer[]> {
    return await Answer.find()
  }

  @Mutation(() => Answer)
  async createAnswer(
    @Arg('input') input: AnswerInput,
  ): Promise<Answer> {
    const question = await Question.findOne(input.questionId)

    return await Answer.create({ ...input, question }).save()
  }
}