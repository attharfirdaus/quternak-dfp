import { Stack, Box, HStack, Avatar, Image, Text } from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import { formatCurrency } from '../../utils/format/currency'
import Iconify from '../appComponent/iconify'
import { useRouter } from 'next/router'

export default function ReadyToProcessCard({ product }: { product: Product }) {
  const router = useRouter()
  function handleCardClick() {
    router.push(`/product/${product?.id}`)
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
            <HStack gap="8px">
              <Avatar
                name={product?.seller?.name}
                boxSize="18px"
                src={product?.seller?.profilePictureUrl}
              />
              <Text {...fontStyle.textXsRegular} color="black">
                {product?.seller?.name}
              </Text>
            </HStack>
            <Iconify icon="bx:heart" color="qu.neutral500" boxSize="24px" />
          </HStack>
          <Text
            {...fontStyle.textXlSemibold}
            color="qu.neutral900"
            noOfLines={1}
          >
            {product.title}
          </Text>
          <Stack gap="4px" w="full">
            <Text {...fontStyle.textXsRegular} color="qu.neutral400">
              Harga mulai dari
            </Text>
            {product?.category.id === 2 && product.type === 'Padat' ? (
              <Text {...fontStyle.textLgMedium} color="qu.neutral900">
                IDR {formatCurrency(product.price[0])}/kg
              </Text>
            ) : (
              <Text {...fontStyle.textLgMedium} color="qu.neutral900">
                IDR {formatCurrency(product?.price[0])}/lt
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
