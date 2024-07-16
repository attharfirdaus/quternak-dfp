import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMeQuery } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import { formatCurrency } from '../../utils/format/currency'
import Iconify from '../appComponent/iconify'
import { addDays, formatDate } from '../../utils/format/date'

export default function TransactionUserProductDetail({
  transaction,
}: {
  transaction: any
}) {
  const [me] = useMeQuery()
  const meData = me?.data?.me
  const thisDay = new Date()
  const estimatedStart = addDays(thisDay, 2)
  const estimatedEnd = addDays(thisDay, 5)

  return (
    <>
      <Stack
        minW="calc(100vw - 306px - 32px - 160px)"
        maxW="calc(100vw - 306px - 32px - 160px)"
        spacing={0}
      >
        <Stack spacing="32px" w="full">
          <Text {...fontStyle.textXlSemibold} color="black">
            Pembayaran
          </Text>
          <Stack spacing="12px" w="full">
            <HStack alignItems="start" justifyContent="space-between" w="full">
              <Text {...fontStyle.textSmSemibold} color="black">
                Alamat Pengiriman
              </Text>
              <Button
                px="16px"
                py="8px"
                bgColor="qu.primary50"
                borderRadius="8px"
                {...fontStyle.textSmSemibold}
                color="qu.primary400"
              >
                Ganti Alamat
              </Button>
            </HStack>
            <Divider borderColor="#EAECF0" />
            <Stack spacing="8px" w="full">
              <Text {...fontStyle.textSmSemibold} color="black">
                {meData?.name}
              </Text>
              <Text {...fontStyle.textSmRegular} color="black">
                {meData?.phoneNumber}
              </Text>
              <Text {...fontStyle.textSmRegular} color="black">
                {meData?.addres}
              </Text>
            </Stack>
          </Stack>
          <Stack spacing="16px" py="16px" borderBlock="3px solid #EAECF0">
            <HStack justifyContent="space-between" w="full" alignItems="start">
              <Stack spacing="16px" w="60%">
                <HStack spacing="20px" w="full">
                  <Avatar
                    boxSize="42px"
                    src={transaction?.product?.seller?.profilePictureUrl}
                    name={transaction?.product?.seller?.name}
                  />
                  <Stack spacing="2px" w="full">
                    <Text {...fontStyle.textLgSemibold} color="qu.neutral900">
                      {transaction?.product?.seller?.name}
                    </Text>
                    <Text {...fontStyle.textMdRegular} color="qu.neutral">
                      {transaction?.product?.location}
                    </Text>
                  </Stack>
                </HStack>
                <Divider borderColor="#EAECF0" />
                <HStack justifyContent="center" spacing="12px" w="full">
                  <Box w="40px" h="40px">
                    <Image
                      alt=""
                      src={transaction?.product?.pictureUrl[0]}
                      borderRadius="6px"
                      boxSize="40px"
                      objectFit="cover"
                    />
                  </Box>
                  <Stack spacing="8px" w="full">
                    <Text
                      {...fontStyle.textSmRegular}
                      noOfLines={2}
                      color="qu.neutral800"
                    >
                      {transaction?.product?.title}
                    </Text>
                    <HStack justifyContent="space-between" w="full">
                      <Text {...fontStyle.textSmSemibold} color="qu.neutral700">
                        {transaction?.product?.category?.id === 1 &&
                        transaction?.product?.variant.length > 0
                          ? `${transaction?.product.variant[transaction?.productVariantIndex]} (${transaction?.productQuantity} barang)`
                          : `${transaction?.productQuantity} barang`}
                      </Text>
                      <Text {...fontStyle.textSmSemibold} color="qu.neutral700">
                        Rp
                        {formatCurrency(transaction?.productPrice)}
                      </Text>
                    </HStack>
                  </Stack>
                </HStack>
              </Stack>
              <Stack spacing="12px">
                <Text {...fontStyle.textMdSemibold} color="black">
                  Pengiriman
                </Text>
                <Text {...fontStyle.textSmMedium} color="qu.neutral800">
                  Kurir Pilihan
                </Text>
                <HStack alignItems="start" spacing="16px" w="full">
                  <Iconify
                    icon="bi:truck"
                    color="qu.neutral800"
                    boxSize="24px"
                  />
                  <Stack spacing="8px">
                    <Text {...fontStyle.textMdRegular} color="qu.neutral800">
                      J&T (Rp20.000)
                    </Text>
                    <Text {...fontStyle.textMdRegular} color="qu.neutral">
                      Estimasi tiba {formatDate(estimatedStart)} -{' '}
                      {formatDate(estimatedEnd)}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </HStack>
            <Divider borderColor="#EAECF0" />
            <Stack spacing="16px" w="full">
              <HStack w="full" justifyContent="space-between">
                <Text {...fontStyle.textMdSemibold} color="black">
                  Subtotal
                </Text>
                <Text {...fontStyle.textMdSemibold} color="black">
                  {formatCurrency(
                    transaction?.productPrice * transaction?.productQuantity +
                      20000 +
                      2000
                  )}
                </Text>
              </HStack>
              <Stack spacing="8px" w="full">
                <HStack justifyContent="space-between" w="full">
                  <Text {...fontStyle.textMdRegular} color="black">
                    Total Harga
                  </Text>
                  <Text {...fontStyle.textMdRegular} color="black">
                    {transaction?.price}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between" w="full">
                  <Text {...fontStyle.textMdRegular} color="black">
                    Ongkir
                  </Text>
                  <Text {...fontStyle.textMdRegular} color="black">
                    Rp20.000
                  </Text>
                </HStack>
                <HStack justifyContent="space-between" w="full">
                  <Text {...fontStyle.textMdRegular} color="black">
                    Biaya Layanan
                  </Text>
                  <Text {...fontStyle.textMdRegular} color="black">
                    Rp2.000
                  </Text>
                </HStack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
