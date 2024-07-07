import { fetchExchange } from '@urql/core'
import { cacheExchange } from '@urql/exchange-graphcache'
import { withUrqlClient } from 'next-urql'

const createUrqlClient = () => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  fetchOptions: {
    credentials: 'include',
  } as RequestInit,
  maskTypename: true,
  exchanges: [
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, _args, cache, _info) => {
            cache.invalidate('Query')
          },
          login: (_result, _args, cache, _info) => {
            cache.invalidate('Query')
          },
          register: (_result, _args, cache, _info) => {
            cache.invalidate('Query')
          },
        },
      },
    }),
    fetchExchange,
  ],
})

const quTernakClient = (component: any) =>
  // @ts-ignore
  withUrqlClient(createUrqlClient)(component)

export default quTernakClient