import {
  Box,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import Layout from '../../components/layout/layout'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import { Product, useProductsQuery } from '../../generated/graphql'
import LiveStockList from '../../components/dashboard/liveStockList'
import ReadyToProcessList from '../../components/dashboard/readyToProcessList'

export default function Dashboard() {
  const [products] = useProductsQuery()
  const { fetching: loading, error, data: productData } = products
  const liveStockProducts = productData?.products?.filter(
    (product) => product.category.id === 1
  ) as Array<Product>
  const readyToProcessProducts = productData?.products?.filter(
    (product) => product.category.id === 2
  ) as Array<Product>

  if (loading) {
    return (
      <>
        <SimpleGrid columns={5} spacing="24px">
          {productData?.products.map((product) => (
            <Skeleton key={product?.id} w="250px" h="320px"></Skeleton>
          ))}
        </SimpleGrid>
      </>
    )
  }

  if (error) {
    return (
      <Box {...fontStyle.textMdRegular} color="black">
        Failed fetching data
      </Box>
    )
  }

  return (
    <>
      <Layout>
        <Stack gap="80px" w="100%" p="80px">
          <HStack
            gap="80px"
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Stack w="45%" gap="10px">
              <Text {...fontStyle.displayMdBold} color="black">
                Dapatkan Hewan Ternak Terbaik di QuTernak!
              </Text>
              <Text {...fontStyle.textSmRegular} color="qu.neutral">
                Hanya di QuTernak yang menyediakan berbagai Hewan Ternak &
                Kurban berkualitas tinggi, serta menyediakan berbagai produk
                olahan hewan ternak.
              </Text>
            </Stack>
            <Image
              src="/images/auth-bg.webp"
              alt=""
              w="55%"
              borderRadius="32px"
            />
          </HStack>
          <Stack spacing="32px">
            <Text {...fontStyle.displayXsBold} color="qu.neutral800">
              Temukan Hewan Ternak & Qurban Terbaik di Sekitar Lokasi Anda
            </Text>
            <LiveStockList products={liveStockProducts} />
          </Stack>
          <Stack spacing="32px">
            <Stack spacing="8px">
              <Text {...fontStyle.displayXsBold} color="qu.neutral800">
                Dapatkan Produk Ternak dari Hasil Peternakan Lokal untuk
                Memajukan UMKM
              </Text>
              <Text {...fontStyle.textMdRegular} color="qu.neutral">
                Mulai dari telur, susu murni, keju, youghourt, dan masih banyak
                lagi!
              </Text>
            </Stack>
            <ReadyToProcessList products={readyToProcessProducts} />
          </Stack>
        </Stack>
      </Layout>
    </>
  )
}
