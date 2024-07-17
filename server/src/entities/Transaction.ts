import { Field, ObjectType } from 'type-graphql'
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { TransactionProduct } from './TransactionProduct'
import { User } from './User'

@ObjectType()
@Entity()
export class Transaction extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  transactionToken: string

  @Field()
  @Column()
  quantity: number

  @Field()
  @Column()
  price: number

  @Field(() => Number, {nullable: true})
  @Column({nullable: true})
  variantIndex?: number

  @Field()
  @Column()
  total: number

  @Field()
  @Column({ default: "pending" })
  status: 'pending' | 'paid' | 'canceled'

  @Field()
  @Column()
  userId: number

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.transactions)
  user: User

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  snapToken?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  snapRedirectUrl?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  paymentMethod?: string

  @Field(() => [ TransactionProduct ])
  @OneToMany(
    () => TransactionProduct,
    (transactionProduct) => transactionProduct.transaction,
    {eager: true}
  )
  @JoinColumn()
  transactionProduct: TransactionProduct[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}
