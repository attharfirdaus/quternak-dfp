import { Flex, Text } from '@chakra-ui/react'
import Particles from 'react-tsparticles'
import { useCallback, useState } from 'react'
import { loadFull } from 'tsparticles'
import { Link } from '@chakra-ui/next-js'
import { fontStyle } from '../styles/customTheme/fontStyle'

export default function IndexPage() {
  const particlesInit = useCallback(async (engine: any) => {
    console.log(engine)
    await loadFull(engine)
  }, [])

  const [isLoaded, setIsLoaded] = useState(false)

  const particlesLoaded = useCallback(async (container: any) => {
    setIsLoaded(container)
  }, [])

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#FFFFFF',
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              // onClick: {
              //   enable: true,
              //   mode: "push",
              // },
              onHover: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              // push: {
              //   quantity: 4,
              // },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: '#FB6200',
            },
            links: {
              color: '#FB6200',
              distance: 150,
              enable: true,
              opacity: 1,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      <Flex
        alignItems="center"
        position="relative"
        direction="column"
        justify="center"
        minW="100vw"
        minH="100vh"
        p="10px"
      >
        <Text
        {...fontStyle.displayMdBold}
          transition="1s ease-in"
          transitionDelay="1s"
          alignItems="center"
          position="absolute"
          bottom="40px"
        >
        QuTernak
        </Text>

        <Flex
          opacity={isLoaded ? 1 : 0}
          transition="1s ease-in"
          alignItems="center"
          direction="column"
        >
          {/* <Flex direction={['column', 'column', 'row']} alignItems="center">
            <ImageWithSkeleton
              src="/icon-512x512.png"
              alt="Logo Dibimbing"
              borderRadius="8px"
              height="72px"
              width="72px"
              mr="10px"
            />
            <Text
              textAlign={['center', 'center', 'start']}
              {...fontStyle.heading3bold}
            >
              Partners
            </Text>
          </Flex> */}
          {/* <Text
            {...fontStyle.body1medium}
            textAlign="center"
            color="#6E7A8A"
            maxW="550px"
            mt="40px"
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </Text> */}
        </Flex>
      </Flex>
    </>
  )
}
