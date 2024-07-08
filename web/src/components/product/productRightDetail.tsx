import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import { useState } from 'react'
import { formatCurrency } from '../../utils/format/currency'

export default function ProductRightDetail({
  product,
  selectedVariantIndex,
}: {
  product: Product
  selectedVariantIndex: number
}) {
  const [productAmount, setProductAmount] = useState(1)
  function productAmountDisplay() {
    if (productAmount > product?.stock[selectedVariantIndex]) {
      setProductAmount(product?.stock[selectedVariantIndex])
      return productAmount
    }
    return productAmount
  }
  function handleProductAmount(operation: string) {
    if (operation === 'minus') {
      setProductAmount(productAmount - 1)
    } else {
      setProductAmount(productAmount + 1)
    }
  }

  const totalPrice = product?.price[selectedVariantIndex] * productAmount

  return (
    <>
      <Box position="sticky" top="80px" mb="-80px">
        <Stack spacing="24px" minW="306px" w="306px">
          <Stack
            spacing="17px"
            borderRadius="12px"
            px="20px"
            py="32px"
            w="full"
            border="1.5px solid #D0D5DD"
          >
            <Text {...fontStyle.textXlSemibold} color="black">
              Atur jumlah dan catatan
            </Text>
            <HStack w='full' spacing="20px">
              <Box w="40px" h="40px">
                <Image
                  alt=""
                  src={product?.pictureUrl[0]}
                  borderRadius="6px"
                  objectFit="cover"
                />
              </Box>
              <Text noOfLines={2} maxW='calc(100% - 20px - 40px)' {...fontStyle.textMdMedium} color="qu.neutral800">
                {product?.category?.id === 1 && product?.variant?.length > 1
                  ? product?.variant[selectedVariantIndex]
                  : product?.title}
              </Text>
            </HStack>
            <Divider w="full" borderColor="#EAECF0" />
            <HStack
              w="fit-content"
              p="8px"
              spacing="30px"
              borderRadius="8px"
              border="1.5px solid #D0D5DD"
            >
              <Button
                isDisabled={productAmount === 1}
                h="24px"
                w="24px"
                bgColor="transparent"
              >
                <Iconify
                  onClick={() => handleProductAmount('minus')}
                  icon="ic:round-minus"
                  color="qu.neutral"
                  boxSize="24px"
                />
              </Button>
              <Text {...fontStyle.textLgRegular} color="black">
                {productAmountDisplay()}
              </Text>
              <Button
                isDisabled={
                  productAmount === product?.stock[selectedVariantIndex]
                }
                h="24px"
                w="24px"
                bgColor="transparent"
              >
                <Iconify
                  onClick={() => handleProductAmount('plus')}
                  icon="ic:round-plus"
                  color="qu.primary"
                  boxSize="24px"
                />
              </Button>
            </HStack>
            <HStack justifyContent="space-between" w="full">
              <Text {...fontStyle.textMdRegular} color="qu.neutral600">
                Subtotal
              </Text>
              <Text {...fontStyle.textXlSemibold} color="black">
                Rp{formatCurrency(totalPrice)}
              </Text>
            </HStack>
          </Stack>
          <Stack
            spacing="17px"
            borderRadius="12px"
            px="20px"
            py="32px"
            w="full"
            border="1.5px solid #D0D5DD"
          >
            <Text {...fontStyle.textXlSemibold} color="black">
              Ringkasan
            </Text>
            <HStack justifyContent="space-between" w="full">
              <Text {...fontStyle.textMdRegular} color="qu.black">
                Total Harga
              </Text>
              <Text {...fontStyle.textMdRegular} color="black">
                Rp{formatCurrency(totalPrice)}
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
                Rp{formatCurrency(totalPrice + 20000 + 2000)}
              </Text>
            </HStack>
            <Button
              w="full"
              bgColor="qu.primary400"
              borderRadius="8px"
              py="8px"
              {...fontStyle.textSmSemibold}
              color="white"
            >
              Beli Sekarang
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
