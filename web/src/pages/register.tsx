import {
  Box,
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Layout from "../components/layout/layout";
import { fontStyle } from "../styles/customTheme/fontStyle";
import { cssHideScrollbar } from "../styles/css";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";

export default function Register() {
  const toast = useToast();
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [, register] = useRegisterMutation();

  async function handleRegisterClick() {
    setIsSubmit(true);

    const response = await register({
      options: {
        name: name,
        username: username,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
    });
    setIsSubmit(false);

    if (response.error) {
      if (response.error) {
        toast({
          title: "Register Error",
          description: "Error create user",
          status: "error",
          duration: 3000,
          position: "top",
        });
        return;
      }
    }

    if (response.data.register.errors && response.data.register.errors[0]) {
      toast({
        title: "Login Error",
        description: response.data.register.errors[0].message,
        status: "error",
        duration: 3000,
        position: "top",
      });
      setIsSubmit(false);
      return;
    } else {
      router.push("/login");
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
          h="full"
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
            maxH="calc(100vh - 154px)"
            css={cssHideScrollbar}
          >
            <Text
              {...fontStyle.displayXsBold}
              color="qu.black"
              textAlign="center"
            >
              Daftar Akun
            </Text>
            <Stack spacing="20px">
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Nama Lengkap
                </Text>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan nama lengkap"
                  color="qu.neutral700"
                  {...fontStyle.textMdRegular}
                />
              </Stack>
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Username
                </Text>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isRequired
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan username"
                  color="qu.neutral700"
                  {...fontStyle.textMdRegular}
                />
              </Stack>
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Email
                </Text>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan email"
                  color="qu.neutral700"
                  type="email"
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
                  isRequired
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan password"
                  color="qu.neutral700"
                  type="password"
                  {...fontStyle.textMdRegular}
                />
              </Stack>
              <Stack spacing="6px">
                <Text {...fontStyle.textMdRegular} color="qu.neutral700">
                  Konfirmasi Password
                </Text>
                <Input
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  isRequired
                  w="full"
                  borderRadius="8px"
                  border="1px solid #D0D5DD"
                  bgColor="transparent"
                  placeholder="Masukkan konfirmasi password"
                  color="qu.neutral700"
                  type="password"
                  {...fontStyle.textMdRegular}
                />
              </Stack>
            </Stack>
            <Text {...fontStyle.textSmRegular} color="qu.neutral600">
              Dengan mendaftarkan akun, Saya setuju dengan{" "}
              <Text
                as="span"
                {...fontStyle.textSmSemibold}
                color="qu.primary600"
              >
                Syarat & Ketentuan
              </Text>{" "}
              dan{" "}
              <Text
                as="span"
                {...fontStyle.textSmSemibold}
                color="qu.primary600"
              >
                Kebijakan Privasi
              </Text>
            </Text>
            <Stack spacing="24px">
              <Button
                onClick={handleRegisterClick}
                isDisabled={
                  !name ||
                  !username ||
                  !email ||
                  !password ||
                  !passwordConfirmation
                }
                isLoading={isSubmit}
                borderRadius="8px"
                bgColor="qu.primary400"
                w="full"
                py="12px"
                {...fontStyle.textSmSemibold}
                color="white"
                _hover={{
                  bgColor: "qu.primary600",
                }}
              >
                Daftar
              </Button>
              <Text
                textAlign="center"
                {...fontStyle.textSmRegular}
                color="qu.black"
              >
                Sudah punya akun?{" "}
                <Text
                  as="a"
                  {...fontStyle.textSmSemibold}
                  color="qu.primary400"
                  href="/login"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Masuk
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
}
