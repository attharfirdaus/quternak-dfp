import { Flex, FlexProps } from '@chakra-ui/react'
import { Icon } from '@iconify/react'

const Iconify = ({
  icon,
  boxSize = '16px',
  ...rest
}: Omit<FlexProps, 'flexShrink' | 'boxSize'> & {
  icon: string
  boxSize?: string
  color?: string
}) => {
  return (
    <Flex fontSize={boxSize} boxSize={boxSize} flexShrink={0} {...rest}>
      <Icon icon={icon} />
    </Flex>
  )
}

export default Iconify