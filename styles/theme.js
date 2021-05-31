import { extendTheme } from "@chakra-ui/react"

const FontFamily =  'Poppins';

const theme = extendTheme({
  fonts: {
    body: FontFamily,
    heading: FontFamily,
    mono: FontFamily,
  },
  colors: {
    brand: {
      50: "#dcfcff",
      100: "#b3f1fd",
      200: "#87e5f8",
      300: "#5bdbf4",
      400: "#37d0f0",
      500: "#25b6d6",
      600: "#168fa7",
      700: "#076678",
      800: "#003d49",
      900: "#00161c",
    },
  },
})

export default theme
