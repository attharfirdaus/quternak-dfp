import { Flex, HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import AccountMenu from './accountMenu'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  const menuItem = [
    { name: 'Beranda', icon: 'bx:home-alt', path: '/dashboard' },
    { name: 'Eksplor', icon: 'bx:compass', path: '/explore' },
    { name: 'Riwayat', icon: 'bx:cart', path: '/history' },
  ]

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
              {menuItem.map((menu) => (
                <ListItem
                  key={menu.path}
                  onClick={() => router.push(menu.path)}
                  cursor="pointer"
                >
                  <HStack spacing="12px">
                    <Iconify
                      icon={menu.icon}
                      boxSize="24px"
                      color={
                        menu.path === router.pathname
                          ? 'qu.primary'
                          : 'qu.neutral'
                      }
                    />
                    <Text
                      {...fontStyle.textMdSemibold}
                      color={
                        menu.path === router.pathname
                          ? 'qu.primary'
                          : 'qu.neutral'
                      }
                    >
                      {menu.name}
                    </Text>
                  </HStack>
                </ListItem>
              ))}
            </HStack>
          </UnorderedList>
          <AccountMenu />
        </HStack>
      </HStack>
      <Flex h="80px" />
    </>
  )
}
