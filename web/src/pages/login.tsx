import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { fontStyle } from '../styles/customTheme/fontStyle'
import { cssHideScrollbar } from '../styles/css'
import { useState } from 'react'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const toast = useToast()
  const [isSubmit, setIsSubmit] = useState(false)
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')

  const [, login] = useLoginMutation()

  async function handleLoginClick() {
    setIsSubmit(true)

    const response = await login({
      usernameOrEmail: emailOrUsername.trim(),
      password: password.trim(),
    })
    setIsSubmit(false)

    if (response.error) {
      toast({
        title: 'Login Error',
        description: 'Error authenticate user',
        status: 'error',
        duration: 3000,
        position: 'top',
      })
      return
    }

    if (response.data?.login.errors && response.data.login.errors[0]) {
      toast({
        title: 'Login Error',
        description: response.data.login.errors[0].message,
        status: 'error',
        duration: 3000,
        position: 'top',
      })
      setIsSubmit(false)
      return
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <>
      <Box
        overflow="auto"
        w="full"
        h="100vh"
        backgroundImage="url('/images/auth-bg.webp')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        alignItems="center"
        py="77px"
      >
        <Flex
          overflow="auto"
          w="full"
          h="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            overflow="auto"
            spacing="40px"
            bgColor="white"
            p="36px"
            borderRadius="12px"
            w="450px"
            maxH="full"
            css={cssHideScrollbar}
          >
            <Text
              {...fontStyle.displayXsBold}
              color="qu.black"
              textAlign="center"
            >
              Masuk Akun
            </Text>
            <Stack spacing="20px">
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Email atau Username
                </Text>
                <Input
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan email atau username"
                  color="qu.neutral700"
                  isRequired
                  {...fontStyle.textMdRegular}
                />
              </Stack>
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Password
                </Text>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan password"
                  color="qu.neutral700"
                  type="password"
                  isRequired
                  {...fontStyle.textMdRegular}
                />
              </Stack>
            </Stack>
            <Stack spacing="24px">
              <Button
                onClick={handleLoginClick}
                isLoading={isSubmit}
                borderRadius="8px"
                bgColor="qu.primary400"
                w="full"
                py="12px"
                isDisabled={!emailOrUsername || !password}
                {...fontStyle.textSmSemibold}
                color="white"
                _hover={{
                  bgColor: 'qu.primary600',
                }}
              >
                Masuk
              </Button>
              <Text
                textAlign="center"
                {...fontStyle.textSmRegular}
                color="qu.black"
              >
                Belum punya akun?{' '}
                <Text
                  as="a"
                  {...fontStyle.textSmSemibold}
                  color="qu.primary400"
                  href="/register"
                  _hover={{
                    textDecoration: 'underline',
                  }}
                >
                  Daftar Sekarang
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}
