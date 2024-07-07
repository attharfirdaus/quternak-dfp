import { Flex, HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import AccountMenu from './accountMenu'

export default function NavBar() {
  return (
    <>
      <HStack
        justifyContent="space-between"
        w="100%"
        bgColor="white"
        px="80px"
        position="fixed"
        h="80px"
        zIndex={100}
      >
        <HStack spacing="18px">
          <Image
            src="/images/logo-quternak.webp"
            width={40}
            height={40}
            alt=""
          />
          <Text {...fontStyle.textXlBold} color="qu.black">
            QuTernak
          </Text>
        </HStack>
        <HStack spacing="64px">
          <UnorderedList styleType="none">
            <HStack spacing="37px">
              <ListItem>
                <HStack spacing="12px">
                  <Iconify
                    icon="bx:home-alt"
                    boxSize="24px"
                    color="qu.neutral500"
                  />
                  <Text {...fontStyle.textMdSemibold} color="qu.neutral500">
                    Beranda
                  </Text>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack spacing="12px">
                  <Iconify
                    icon="bx:compass"
                    boxSize="24px"
                    color="qu.neutral500"
                  />
                  <Text {...fontStyle.textMdSemibold} color="qu.neutral500">
                    Eksplor
                  </Text>
                </HStack>
              </ListItem>
              <ListItem>
                <HStack spacing="12px">
                  <Iconify
                    icon="bx:cart"
                    boxSize="24px"
                    color="qu.neutral500"
                  />
                  <Text {...fontStyle.textMdSemibold} color="qu.neutral500">
                    Riwayat
                  </Text>
                </HStack>
              </ListItem>
            </HStack>
          </UnorderedList>
          <AccountMenu/>
        </HStack>
      </HStack>
      <Flex h="80px" />
    </>
  )
}
