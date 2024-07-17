import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Layout from '../../../components/layout/layout'
import { HStack } from '@chakra-ui/react'
import ProductLeftDetail from '../../../components/product/productLeftDetail'
import { Product, useProductByIdQuery } from '../../../generated/graphql'
import ProductMiddleDetail from '../../../components/product/productMiddleDetail'
import ProductRightDetail from '../../../components/product/productRightDetail'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  return {
    props: {
      id,
    },
  }
}

export default function ProductDetailPage({ id }: any) {
  const [product] = useProductByIdQuery({
    variables: {
      id: Number(id),
    },
  })
  const productData = product?.data?.productById as Product

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0)

  return (
    <>
      <Layout>
        <HStack alignItems='start' w="full" spacing="36px" p="80px">
          <ProductLeftDetail product={productData} />
          <ProductMiddleDetail
            product={productData}
            selectedVariantIndex={selectedVariantIndex}
            setSelectedVariantIndex={setSelectedVariantIndex}
          />
          <ProductRightDetail
            product={productData}
            selectedVariantIndex={selectedVariantIndex}
          />
        </HStack>
      </Layout>
    </>
  )
}
