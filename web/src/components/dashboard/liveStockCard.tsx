import { Avatar, Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import { formatCurrency } from '../../utils/format/currency'
import { useRouter } from 'next/router'

export default function LiveStockCard({ product }: { product: Product }) {
  const router = useRouter()
  function handleCardClick() {
    router.push(`/product/${product.id}`)
  }

  return (
    <>
      <Stack
        cursor="pointer"
        _hover={{
          transform: 'translateY(-7px)',
          boxShadow: 'xl',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        }}
        onClick={handleCardClick}
        gap="8px"
        borderRadius="12px"
        bgColor="white"
        boxShadow="md"
      >
        <Box h="163px" w="full">
          <Image
            w="full"
            h="full"
            objectFit="cover"
            src={product?.pictureUrl[0]}
            alt=""
            borderTopRadius="12px"
          />
        </Box>
        <Stack px="12px" pb="20px" gap="12px" w="full">
          <HStack w="full" justifyContent="space-between">
            <HStack gap="16px">
              <Avatar
                name={product?.seller?.name}
                boxSize="28px"
                src={product?.seller?.profilePictureUrl}
              />
              <Stack spacing={0}>
                <Box w="100%">
                  <Text
                    noOfLines={1}
                    {...fontStyle.textSmSemibold}
                    color="qu.neutral900"
                  >
                    {product.title}
                  </Text>
                </Box>
                <HStack spacing={0}>
                  <Iconify
                    icon="system-uicons:location"
                    color="qu.neutral600"
                    boxSize="12px"
                  />
                  <Text
                    noOfLines={2}
                    {...fontStyle.textXsRegular}
                    color="qu.neutral600"
                  >
                    {product.location}
                  </Text>
                </HStack>
              </Stack>
            </HStack>
            <Iconify icon="bx:heart" color="qu.neutral500" boxSize="24px" />
          </HStack>
          <Text
            {...fontStyle.textXsRegular}
            color="qu.neutral400"
            noOfLines={2}
          >
            {product.description}
          </Text>
          <Stack gap="4px" w="full">
            <Text {...fontStyle.textXsRegular} color="qu.neutral600">
              Harga
            </Text>
            {product?.price.length > 1 ? (
              <Text {...fontStyle.textSmSemibold} color="qu.neutral900">
                IDR {formatCurrency(product?.price[0])} -{' '}
                {formatCurrency(product?.price[product.price.length - 1])}
              </Text>
            ) : (
              <Text {...fontStyle.textSmSemibold} color="qu.neutral900">
                IDR {formatCurrency(product?.price[0])}
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
