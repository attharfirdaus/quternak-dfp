import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Product } from '../../generated/graphql'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import { formatCurrency } from '../../utils/format/currency'

export default function ProductMiddleDetail({
  product,
  selectedVariantIndex,
  setSelectedVariantIndex,
}: {
  product: Product
  selectedVariantIndex: number
  setSelectedVariantIndex: (index: number) => void
}) {
  return (
    <>
      <Stack
        spacing="32px"
        minW="calc(100vw - 316px - 306px - 72px - 160px)"
        maxW="calc(100vw - 316px - 306px - 72px - 160px)"
      >
        <Stack spacing="16px" w="full">
          <Stack spacing="12px">
            <Text {...fontStyle.displayXsSemibold} color="black">
              {product?.title}
            </Text>
            <HStack w="full" spacing="12px">
              <Text {...fontStyle.textSmRegular} color="black">
                Terjual{' '}
                <Text
                  as="span"
                  {...fontStyle.textSmSemibold}
                  color="qu.neutral"
                >
                  900+
                </Text>
              </Text>
              <Box
                w="6px"
                h="6px"
                bgColor="qu.neutral600"
                borderRadius="100%"
              />
              <HStack spacing="4px">
                <Iconify icon="bxs:star" color="qu.primary400" boxSize="16px" />
                <Text {...fontStyle.textSmRegular} color="black">
                  5{' '}
                  <Text
                    as="span"
                    {...fontStyle.textSmRegular}
                    color="qu.neutral"
                  >
                    {'(99 rating)'}
                  </Text>
                </Text>
              </HStack>
              <Text {...fontStyle.textSmRegular} color="black">
                Diskusi{' '}
                <Text
                  as="span"
                  {...fontStyle.textSmSemibold}
                  color="qu.neutral"
                >
                  {'(18)'}
                </Text>
              </Text>
            </HStack>
          </Stack>
          <Text {...fontStyle.displaySmBold} color="black" fontSize="32px">
            Rp{formatCurrency(product?.price[selectedVariantIndex])}
          </Text>
        </Stack>
        {product?.variant && product?.variant?.length > 1 && (
          <>
            <Divider borderColor="#D0D5DD" />
            <Stack spacing="24px" w="full">
              <Text {...fontStyle.textXlSemibold} color="black">
                Pilih tipe produk:{' '}
                <Text
                  as="span"
                  {...fontStyle.textXlRegular}
                  color="qu.neutral600"
                >
                  {product.variant[selectedVariantIndex]}
                </Text>
              </Text>
              <SimpleGrid columns={3} spacing="24px">
                {product.variant.map((variant, index) => (
                  <>
                    <Button
                      onClick={() => setSelectedVariantIndex(index)}
                      isDisabled={product?.stock[index] === 0}
                      gap="20px"
                      h="56px"
                      borderRadius="12px"
                      border={`2px solid ${selectedVariantIndex === index ? '#FB6200' : '#FDC099'}`}
                      bgColor={
                        selectedVariantIndex === index
                          ? 'qu.primary100'
                          : 'qu.primary25'
                      }
                    >
                      <Box w="32px" h="32px">
                        <Image
                          opacity={
                            selectedVariantIndex === index ? '100%' : '50%'
                          }
                          boxSize='32px'
                          alt=""
                          src={product.pictureUrl[0]}
                          borderRadius="6px"
                        />
                      </Box>
                      <Text
                        {...fontStyle.textMdMedium}
                        color={
                          selectedVariantIndex === index
                            ? 'qu.primary'
                            : 'qu.primary200'
                        }
                      >
                        {variant}
                      </Text>
                    </Button>
                  </>
                ))}
              </SimpleGrid>
            </Stack>
          </>
        )}
        <Divider borderColor="#D0D5DD" />
        <Text textAlign='justify' {...fontStyle.textSmRegular} color="qu.neutral600">
          {product?.description}
        </Text>
      </Stack>
    </>
  )
}
