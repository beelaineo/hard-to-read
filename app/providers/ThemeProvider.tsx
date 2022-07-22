import * as React from 'react'
import {
  defaultTheme,
  ThemeProvider as XThemeProvider,
  Preflight,
  createGlobalStyle,
} from '@xstyled/styled-components'

interface Props {
  children: React.ReactNode
}

const theme = {
  ...defaultTheme,
  fonts: {
    mono: `"Courier New", monospace`,
    serif: `"Times New Roman", Times, serif`,
    sans: `Arial, sans-serif`,
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Times New Roman', Times, serif;
  }

  a {
    cursor: pointer;
    color: inherit;
    text-decoration: inherit;
  }
`

export const ThemeProvider = ({ children }: Props) => {
  return (
    <XThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      {children}
    </XThemeProvider>
  )
}
