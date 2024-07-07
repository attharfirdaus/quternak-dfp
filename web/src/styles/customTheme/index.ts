import { extendTheme } from "@chakra-ui/react";
import colors from "./colorTheme";
import { fontStyle } from "./fontStyle";
import "@fontsource-variable/work-sans"

const fonts = {
    heading: 'Work Sans Variable, sans-serif',
    body: 'Work Sans Variable, sans-serif',
    work: 'Work Sans Variable, sans-serif'
}

const theme = extendTheme({
    colors,
    fontStyle,
    fonts
})

export default theme