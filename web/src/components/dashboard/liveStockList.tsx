import { SimpleGrid } from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import LiveStockCard from './liveStockCard'

export default function LiveStockList({
  products,
}: {
  products: Array<Product>;
}) {
  return (
    <>
      {products && products.length > 0 && (
        <>
          <SimpleGrid columns={5} spacing='24px'>
            {products.map((product) => (
              <>
                <LiveStockCard product={product} />
              </>
            ))}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
