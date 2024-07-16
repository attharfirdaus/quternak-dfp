import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import Layout from '../../components/layout/layout'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import { Transaction, useMyTransactionsQuery } from '../../generated/graphql'
import { formatDate } from '../../utils/format/date'
import { formatCurrency } from '../../utils/format/currency'
import { useMemo, useState } from 'react'

export default function History() {
  const [transaction] = useMyTransactionsQuery()
  const transactions = transaction?.data?.myTransactions as Array<Transaction>
  const [filteredStatus, setFilteredStatus] = useState('')

  const filteredTransactions = useMemo(() => {
    if (filteredStatus === '') {
      return transactions
    }
    return transactions.filter(
      (transaction) => transaction.status === filteredStatus
    )
  }, [filteredStatus, transactions])

  return (
    <>
      <Layout>
        <Box p="80px">
          <Stack
            spacing="32px"
            borderRadius="12px"
            p="24px 20px 64px 20px"
            border="1px solid #EAECF0"
            boxShadow="md"
            w="fit-content"
            m="auto"
          >
            <Text {...fontStyle.textLgSemibold} color="black">
              Daftar Transaksi
            </Text>
            <Stack spacing="24px">
              <HStack spacing="16px" p="8px">
                <Text {...fontStyle.textSmSemibold} color="black">
                  Status
                </Text>
                <HStack spacing="8px">
                  <Button
                    onClick={() => setFilteredStatus('')}
                    borderRadius="8px"
                    h="36px"
                    border="1px solid #FC8133"
                    bgColor={filteredStatus === '' ? 'qu.primary50' : 'white'}
                    {...fontStyle.textXsMedium}
                    color="qu.primary400"
                  >
                    Semua
                  </Button>
                  <Button
                    onClick={() => setFilteredStatus('pending')}
                    borderRadius="8px"
                    h="36px"
                    border="1px solid #FC8133"
                    bgColor={
                      filteredStatus === 'pending' ? 'qu.primary50' : 'white'
                    }
                    {...fontStyle.textXsMedium}
                    color="qu.primary400"
                  >
                    Berlangsung
                  </Button>
                  <Button
                    onClick={() => setFilteredStatus('paid')}
                    borderRadius="8px"
                    h="36px"
                    border="1px solid #FC8133"
                    bgColor={
                      filteredStatus === 'paid' ? 'qu.primary50' : 'white'
                    }
                    {...fontStyle.textXsMedium}
                    color="qu.primary400"
                  >
                    Berhasil
                  </Button>
                  <Button
                    onClick={() => setFilteredStatus('canceled')}
                    borderRadius="8px"
                    h="36px"
                    border="1px solid #FC8133"
                    bgColor={
                      filteredStatus === 'canceled' ? 'qu.primary50' : 'white'
                    }
                    {...fontStyle.textXsMedium}
                    color="qu.primary400"
                  >
                    Gagal
                  </Button>
                </HStack>
                <Text
                  cursor="pointer"
                  onClick={() => setFilteredStatus('')}
                  {...fontStyle.textSmSemibold}
                  color="qu.primary400"
                >
                  Hapus Filter
                </Text>
              </HStack>
              {transactions && transactions.length > 0 && (
                <>
                  {filteredTransactions
                    .sort(
                      (a, b) =>
                        Number(new Date(b.createdAt)) -
                        Number(new Date(a.createdAt))
                    )
                    .map((transaction) => (
                      <>
                        <Stack
                          p="20px"
                          spacing="16px"
                          borderRadius="6px"
                          border="1px solid #EAECF0"
                        >
                          <Stack spacing="12px">
                            <HStack spacing="24px">
                              <HStack spacing="12px">
                                <Text
                                  {...fontStyle.textXsSemibold}
                                  color="black"
                                >
                                  Tanggal
                                </Text>
                                <Text
                                  {...fontStyle.textXsRegular}
                                  color="black"
                                >
                                  {formatDate(
                                    new Date(transaction.createdAt),
                                    true
                                  )}
                                </Text>
                              </HStack>
                              {transaction.status === 'pending' && (
                                <Center
                                  borderRadius="8px"
                                  border="1px solid #FC8133"
                                  h="22px"
                                  px="16px"
                                  bgColor="qu.primary50"
                                  {...fontStyle.textXsRegular}
                                  color="qu.primary400"
                                >
                                  Sedang Berlangsung
                                </Center>
                              )}
                              {transaction.status === 'paid' && (
                                <Center
                                  borderRadius="8px"
                                  border="1px solid #3CCB7F"
                                  h="22px"
                                  px="16px"
                                  bgColor="qu.success50"
                                  {...fontStyle.textXsRegular}
                                  color="qu.success400"
                                >
                                  Berhasil
                                </Center>
                              )}
                              {transaction.status === 'canceled' && (
                                <Center
                                  borderRadius="8px"
                                  border="1px solid #FDB022"
                                  h="22px"
                                  px="16px"
                                  bgColor="qu.warning50"
                                  {...fontStyle.textXsRegular}
                                  color="qu.warning400"
                                >
                                  Gagal
                                </Center>
                              )}
                            </HStack>
                            <HStack spacing="20px">
                              <Avatar
                                src={transaction.user.profilePictureUrl}
                                name={transaction.user.name}
                                boxSize="42px"
                              />
                              <Stack spacing="2px">
                                <Text
                                  {...fontStyle.textSmSemibold}
                                  color="qu.neutral900"
                                >
                                  {transaction.user.name}
                                </Text>
                                <Text
                                  {...fontStyle.textSmRegular}
                                  color="qu.neutral"
                                >
                                  {transaction.user.city},{' '}
                                  {transaction.user.province}
                                </Text>
                              </Stack>
                            </HStack>
                          </Stack>
                          <Divider borderColor="#EAECF0" />
                          <HStack spacing="12px" px="20px" w="full">
                            <Box w="40px" h="40px">
                              <Image
                                alt=""
                                src={
                                  transaction.transactionProduct[0].product
                                    .pictureUrl[0]
                                }
                                borderRadius="6px"
                                objectFit="cover"
                                boxSize="40px"
                              />
                            </Box>
                            <Stack spacing="8px" noOfLines={1}>
                              <Text
                                {...fontStyle.textSmRegular}
                                color="qu.neutral800"
                              >
                                {
                                  transaction.transactionProduct[0].product
                                    .title
                                }
                              </Text>
                              <HStack spacing="16px">
                                <Text
                                  {...fontStyle.textSmSemibold}
                                  color="qu.neutral700"
                                >
                                  {transaction.transactionProduct[0].product
                                    .variant.length > 1
                                    ? `${transaction.transactionProduct[0].product.variant[transaction.variantIndex]} (${transaction.quantity} barang)`
                                    : `${transaction.quantity} barang`}
                                </Text>
                                <Text
                                  {...fontStyle.textSmSemibold}
                                  color="qu.neutral700"
                                >
                                  Rp{formatCurrency(transaction.total)}
                                </Text>
                              </HStack>
                            </Stack>
                          </HStack>
                        </Stack>
                      </>
                    ))}
                </>
              )}
            </Stack>
          </Stack>
        </Box>
      </Layout>
    </>
  )
}
