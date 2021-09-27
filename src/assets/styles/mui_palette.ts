import { createTheme } from '@material-ui/core'
import './_root.scss'

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    primary: PaletteColor
    black: string
    white: string
  }
  interface PaletteOptions {
    black?: string
    white?: string
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    black: 'var(--black)',
    white: 'var(--white)',
  },
})

export default theme
