import {
  Avatar,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { fontStyle } from '../../styles/customTheme/fontStyle'
import Iconify from '../appComponent/iconify'
import { useMeQuery } from '../../generated/graphql'

export default function AccountMenu() {
  const [me] = useMeQuery()
  // console.log(me.data.me)

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={
          <Iconify icon="bx:chevron-down" boxSize="24px" color="qu.neutral" />
        }
        bgColor="white"
        _hover={{
          bgColor: 'white',
        }}
        _focus={{
          bgColor: 'white',
        }}
      >
        <HStack spacing="8px">
          <Avatar name={me.data?.me?.name} src={me.data?.me?.profilePictureUrl} boxSize="40px" />
          <Text {...fontStyle.textMdSemibold} color="qu.neutral500">
            {me.data?.me?.username}
          </Text>
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuItem as="a">
          <Flex alignItems="center" gap="10px">
            <Text {...fontStyle.textMdRegular} color="qu.black">
              Profil
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem as="a">
          <Flex alignItems="center" gap="10px">
            <Text {...fontStyle.textMdRegular} color="qu.primary">
              Keluar
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
