import { ObjectType, Field } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  name: string

  @Field()
  @Column({unique: true})
  username!: string

  @Field()
  @Column({unique: true})
  email!: string

  @Column()
  password!: string

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  phoneNumber: string

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  addres: string

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  city: string

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  province: string

  @Field(() => String, {nullable: true})
  @Column({nullable: true})
  nik: string

  @Field()
  @Column({default: 'customer'})
  role: 'admin' | 'customer'

  @Field()
  @CreateDateColumn()
  createdAt!: Date

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date

}