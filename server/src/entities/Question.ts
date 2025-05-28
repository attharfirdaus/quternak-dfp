import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Answer } from './Answer'
import { AnswerResult } from './AnswerResult'

@ObjectType()
@Entity()
export class Question extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  question: string

  @Field()
  @Column()
  answerExpectation: string

  @Field(() => [Answer])
  @OneToMany(() => Answer, (answer) => answer.question)
  answer!: Answer[]

  @Field(() => [AnswerResult])
  @OneToMany(() => AnswerResult, (answerResult) => answerResult.question)
  answerResult: AnswerResult

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
