import 'reflect-metadata'
import path from 'path'
import { createConnection } from 'typeorm'
import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createContext } from './types'
import { UserResolver } from './resolvers/user'
import { User } from './entities/User'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import dotenv from 'dotenv'
import { Category } from './entities/Category'
import { CategoryResolver } from './resolvers/category'
import { Product } from './entities/Product'
import { ProductResolver } from './resolvers/product'
import { TransactionProduct } from './entities/TransactionProduct'
import { Transaction } from './entities/Transaction'
import { TransactionResolver } from './resolvers/transaction'
import { Answer } from './entities/Answer'
import { Question } from './entities/Question'
import { QuestionResolver } from './resolvers/question'
import { AnswerResolver } from './resolvers/answer'
import { AnswerResult } from './entities/AnswerResult'

dotenv.config

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'quternak',
    // url: process.env.DATABASE_URL,
    // synchronize: true,
    logging: true,
    entities: [User, Category, Product, Transaction, TransactionProduct, Answer, Question, AnswerResult],
    migrations: [path.join(__dirname, './migrations/*')],
    subscribers: [],
  })
  await conn.runMigrations()

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(process.env.REDIS_URL)

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(
    session({
      name: 'sid',
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      saveUninitialized: false,
      secret: 'quternak',
      resave: false
    })
  )

  const apolloServer: ApolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, CategoryResolver, ProductResolver, TransactionResolver, QuestionResolver, AnswerResolver],
      validate: false,
    }),
    context: ({ req, res }) => createContext(req, res, redis),
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log(err)
})
