import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Answer } from './Answer'
import { Question } from './Question'

@ObjectType()
@Entity()
export class AnswerResult extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  result: string

  @Field(() => Answer)
  @ManyToOne(() => Answer, (answer) => answer.answerResult)
  answer!: Answer

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.answerResult)
  question!: Question

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}