import { isAuth } from '../middleware/isAuth'
import argon2 from 'argon2'
import { User } from '../entities/User'
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { validateRegister } from '../utils/validateRegister'
import { getConnection } from 'typeorm'
import { sessionData } from '../utils/session'

@InputType()
export class EmailPasswordInput {
  @Field()
  name: string
  @Field()
  username: string
  @Field()
  email: string
  @Field()
  password: string
  @Field()
  passwordConfirmation: string
}

@ObjectType()
export class FieldError {
  @Field()
  field: string

  @Field()
  message: string
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => User, { nullable: true })
  user?: User
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { req }: MyContext): Promise<User | undefined | null> {
    if (!req.session.userId) {
      return null
    }

    return User.findOne(req.session.userId)
  }

  formatUsername(username: string): string {
    return username.trim()
  }

  formatLowerCase(value: string) {
    return value.trim().toLowerCase()
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options", () => EmailPasswordInput) options: EmailPasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    options.email = this.formatLowerCase(options.email)
    options.username = this.formatLowerCase(options.username)
    const errors = validateRegister(options)

    if (errors) {
      return {
        errors,
      }
    }

    const hashedPassword = await argon2.hash(options.password)

    let user
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          name: options.name,
          username: options.username,
          email: options.email,
          password: hashedPassword,
        })
        .returning('*')
        .execute()
      user = result.raw[0]
    } catch (error) {
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
          return {
            errors: [
              {
                field: 'email',
                message: 'email already taken',
              },
            ],
          }
        }
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken',
            },
          ],
        }
      }
    }

    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    usernameOrEmail = this.formatUsername(usernameOrEmail)
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? {
          where: {
            email: usernameOrEmail,
          },
        }
        : {
          where: {
            username: usernameOrEmail,
          },
        }
    )

    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "that username or email does't exist",
          },
        ],
      }
    }

    const valid = await argon2.verify(user.password, password)
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password invalid',
          },
        ],
      }
    }

    req.session.userId = user.id
    console.log(req.session.userId)
    sessionData.saveUserSessionId({
      userId: user.id,
      sessionId: req.sessionID,
    })

    return { user }
  }
}
