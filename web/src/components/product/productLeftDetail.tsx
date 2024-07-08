import { Avatar, Box, HStack, Image, Stack, Text } from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import { addDays, formatDate } from '../../utils/format/date'

export default function ProductLeftDetail({ product }: { product: Product }) {
  const thisDay = new Date()
  const estimatedStart = addDays(thisDay, 2)
  const estimatedEnd = addDays(thisDay, 5)

  return (
    <>
      <Stack minW="316px" w="316px" spacing="40px">
        <Box w="full" h="316px">
          <Image
            alt=""
            src={product?.pictureUrl[0]}
            borderRadius="12px"
            objectFit="cover"
          />
        </Box>
        <Stack w="full" borderTop="1px solid #EAECF0" spacing="64px" pt="32px">
          <HStack spacing="20px" px="24px" w="full">
            <Avatar
              name={product?.seller?.name}
              src={product?.seller?.profilePictureUrl}
              boxSize="54px"
            />
            <Stack spacing="8px">
              <Text {...fontStyle.textLgSemibold} color="qu.neutral900">
                {product?.seller?.name}
              </Text>
              <Text {...fontStyle.textMdRegular} color="qu.neutral900">
                Online{' '}
                <Text
                  as="span"
                  {...fontStyle.textMdSemibold}
                  color="qu.neutral600"
                >
                  4 jam lalu
                </Text>
              </Text>
            </Stack>
          </HStack>
          <Stack spacing="16px" w="full">
            <Text {...fontStyle.textXlSemibold} color="black">
              Pengiriman
            </Text>
            <HStack spacing="16px" w="full">
              <Iconify
                icon="system-uicons:location"
                boxSize="24px"
                color="qu.neutral800"
              />
              <Text {...fontStyle.textLgRegular} color="qu.neutral800">
                Dikirim dari{' '}
                <Text
                  as="span"
                  {...fontStyle.textLgSemibold}
                  color="qu.neutral800"
                >
                  {product?.location}
                </Text>
              </Text>
            </HStack>
            <HStack spacing="16px" w="full">
              <Iconify icon="bi:truck" boxSize="24px" color="qu.neutral800" />
              <Text {...fontStyle.textLgRegular} color="qu.neutral800">
                Ongkir Reguler 20rb
              </Text>
            </HStack>
            <Stack spacing="16px" w="full" pl="40px">
              <Text {...fontStyle.textLgRegular} color="qu.neutral">
                Estimasi tiba {formatDate(estimatedStart)} -{' '}
                {formatDate(estimatedEnd)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
