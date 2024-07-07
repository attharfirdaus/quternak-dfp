import { Box, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import NavBar from './navBar'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <Flex bgColor="white" minH="100svh" w="100%">
      <Box w="full" h="fit">
        <NavBar />
        {children}
      </Box>
    </Flex>
  )
}
