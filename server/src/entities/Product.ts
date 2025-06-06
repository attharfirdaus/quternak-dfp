import { Field, ObjectType } from 'type-graphql'
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Category } from './Category'
import { User } from './User'
import { TransactionProduct } from './TransactionProduct'

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field()
  @Column()
  title: string

  @Field(() => [ Number ])
  @Column('simple-array')
  price!: number[]

  @Field(() => [ Number ], {nullable: true})
  @Column('simple-array', {nullable: true})
  stock!: number[]

  @Field(() => [ String ], {nullable: true})
  @Column('simple-array', {nullable: true})
  variant: string[]

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  type: string

  @Field()
  @Column()
  description: string

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.products)
  category!: Category

  @Field()
  @Column()
  location: string

  @Field(() => [ String ], {nullable: true})
  @Column('simple-array', {nullable: true})
  pictureUrl: string[]

  @Field()
  @Column({default: 'not sold'})
  status: 'not sold' | 'sold'

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.products)
  seller: User

  @Field(() => [ TransactionProduct ])
  @OneToMany(() => TransactionProduct, (transactionProduct) => transactionProduct.product)
  transactionProduct: TransactionProduct[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}