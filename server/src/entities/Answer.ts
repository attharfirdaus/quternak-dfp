import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Question } from './Question'
import { AnswerResult } from './AnswerResult'

@ObjectType()
@Entity()
export class Answer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  answer: string

  @Field(() => [Question])
  @ManyToOne(() => Question, (question) => question.answer)
  question!: Question

  @Field(() => [AnswerResult])
  @OneToMany(() => AnswerResult, (answerResult) => answerResult.answer)
  answerResult: AnswerResult

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
