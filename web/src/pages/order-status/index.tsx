import { useRouter } from 'next/router'
import {
  Transaction,
  useMyTransactionByTokenQuery,
} from '../../generated/graphql'
import { Box, Button, Image, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Layout from '../../components/layout/layout'
import { fontStyle } from '../../styles/customTheme/fontStyle'

export default function OrderStatus() {
  const router = useRouter()
  const [transactionToken, setTransactionToken] = useState('')

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.transaction_token || router.query.order_id
      if (typeof token === 'string') {
        setTransactionToken(token)
      }
    }
  }, [router.isReady, router.query])

  const [transactionDetail] = useMyTransactionByTokenQuery({
    variables: {
      transactionToken: transactionToken,
    },
  })
  const transactionData = transactionDetail?.data
    ?.myTransactionByToken as Transaction

  return (
    <>
      <Layout>
        <Stack spacing="24px" p="32px 20px" w="400px" m="auto">
          <Stack spacing="8px">
            <Text
              {...fontStyle.textXlSemibold}
              textAlign="center"
              color="black"
            >
              {transactionData.status === 'paid'
                ? 'Pembayaran Berhasil'
                : 'Pembayaran Gagal'}
            </Text>
            <Text textAlign="center" {...fontStyle.textMdRegular} color="black">
              {transactionData.transactionToken}
            </Text>
          </Stack>
          <Box w='300px' h='300px'>
            <Image alt='' src='/images/money-investment.webp' />
          </Box>
          <Text textAlign='center' {...fontStyle.textMdRegular} color='qu.neutral600'>
                {transactionData.status === 'paid' ? 'Pembayaran berhasil! Silahkan lihat di riwayat untuk mengecek status pengiriman barang!' : 'Pembayaran gagal! Silahkan coba ulang kembali!'}
          </Text>
          <Stack spacing='12px' w='full'>
            <Button onClick={() => router.push('/history')} bgColor='qu.primary400' borderRadius='8px' h='36px' {...fontStyle.textSmSemibold} color='white'>Lihat Riwayat</Button>
            <Button onClick={() => router.push('/dashboard')} bgColor='qu.primary50' borderRadius='8px' h='36px' {...fontStyle.textSmSemibold} color='qu.primary400'>Kembali ke Beranda</Button>
          </Stack>
        </Stack>
      </Layout>
    </>
  )
}
