import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Transaction } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import { formatCurrency } from '../../utils/format/currency'

export default function TransactionPriceDetail({
  transaction,
  handlePayment,
}: {
  transaction: any
  handlePayment: () => void
}) {
  return (
    <>
      <Stack
        borderRadius="12px"
        border="1.5px solid #EAECF0"
        p="20px 32px"
        spacing="17px"
        minW="306px"
        w="306px"
      >
        <Text {...fontStyle.textXlSemibold} color="black">
          Ringkasan
        </Text>
        <HStack w="full" spacing="20px">
          <Box w="40px" h="40px">
            <Image
              alt=""
              src={transaction?.product?.pictureUrl[0]}
              borderRadius="6px"
              objectFit="cover"
            />
          </Box>
          <Text
            noOfLines={2}
            maxW="calc(100% - 20px - 40px)"
            {...fontStyle.textMdMedium}
            color="qu.neutral800"
          >
            {transaction?.product?.category?.id === 1 &&
            transaction?.product?.variant?.length > 0
              ? transaction?.product?.variant[transaction?.productVariantIndex]
              : transaction?.product?.title}
          </Text>
        </HStack>
        <Divider borderColor="#EAECF0" />
        <HStack justifyContent="space-between" w="full">
          <Text {...fontStyle.textMdRegular} color="qu.black">
            Total Harga
          </Text>
          <Text {...fontStyle.textMdRegular} color="black">
            Rp
            {formatCurrency(
              transaction?.product?.price[transaction?.productVariantIndex]
            )}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text {...fontStyle.textMdRegular} color="qu.black">
            Ongkir
          </Text>
          <Text {...fontStyle.textMdRegular} color="black">
            Rp{formatCurrency(20000)}
          </Text>
        </HStack>
        <HStack justifyContent="space-between" w="full">
          <Text {...fontStyle.textMdRegular} color="qu.black">
            Biaya Layanan
          </Text>
          <Text {...fontStyle.textMdRegular} color="black">
            Rp{formatCurrency(2000)}
          </Text>
        </HStack>
        <Divider borderColor="#D0D5DD" />
        <HStack justifyContent="space-between" w="full">
          <Text {...fontStyle.textMdRegular} color="black">
            Subtotal
          </Text>
          <Text {...fontStyle.textXlSemibold} color="black">
            Rp
            {formatCurrency(
              transaction?.productPrice * transaction?.productQuantity +
                20000 +
                2000
            )}
          </Text>
        </HStack>
        <Button
          w="full"
          bgColor="qu.primary400"
          borderRadius="8px"
          py="8px"
          {...fontStyle.textSmSemibold}
          color="white"
          onClick={handlePayment}
        >
          Bayar Sekarang
        </Button>
      </Stack>
    </>
  )
}
