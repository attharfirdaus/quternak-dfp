import { Request, Response } from 'express'
import { Redis } from 'ioredis'
import * as Sentry from '@sentry/node'
import '@sentry/tracing'
import { Transaction } from '@sentry/types'

export type MyContext = {
  req: Request,
  res: Response,
  redis: Redis,
  transaction: Transaction
}

export interface Context {
  // ... other context fields for your context
  req: Request,
  res: Response,
  redis: Redis,
  transaction: Transaction
}

export async function createContext(req: Request, res: Response, redis: Redis): Promise<Context> {
  {
  // ... create other context fields
    const transaction = Sentry.startTransaction({
      op: 'gql',
      name: 'GraphQLTransaction', // this will be the default name, unless the gql query has a name
    })
    return { req, res, redis, transaction }
  }
}

declare module 'express-session' {
  interface Session {
    userId: number
  }
}

export type CSVPromoCode = {
  CODE: string,
  'START DATE': Date,
  'END DATE': Date,
  TYPE: 'percentage' | 'nominal',
  NOMINAL: number | undefined,
  PERCENTAGE: number | undefined,
  'MINIMUM PURCHASE': number,
  'NUMBER OF USES': number,
  'APPLICABLE PRODUCTS': string,
  'IS PRIVATE': boolean | undefined
}