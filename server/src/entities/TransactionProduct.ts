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
import { Transaction } from './Transaction'
import { Product } from './Product'

@ObjectType()
@Entity()
export class TransactionProduct extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Transaction)
  @ManyToOne(() => Transaction, (transaction) => transaction.transactionProduct)
  transaction: Transaction

  @Field()
  @Column()
  productId: number

  @Field(() => Product)
  @ManyToOne(() => Product, (product) => product.transactionProduct)
  product: Product

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
