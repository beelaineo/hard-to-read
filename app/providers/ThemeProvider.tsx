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

  html, body, div {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  html::-webkit-scrollbar, body::-webkit-scrollbar, div::-webkit-scrollbar { 
      display: none;
  }


  a {
    cursor: pointer;
    color: inherit;
    text-decoration: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
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
