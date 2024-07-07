import { initUrqlClient } from 'next-urql'
import { cacheExchange, fetchExchange, ssrExchange } from '@urql/core'

const ssrCache = ssrExchange({ isClient: false, staleWhileRevalidate: true })
const client = initUrqlClient(
  {
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    exchanges: [cacheExchange, ssrCache, fetchExchange],
  },
  false /* set to false to disable suspense */
)

export default client