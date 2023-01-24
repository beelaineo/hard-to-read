import * as React from 'react'
import {
  defaultTheme,
  ThemeProvider as XThemeProvider,
  Preflight,
  createGlobalStyle,
} from '@xstyled/styled-components'

const { useEffect, useState } = React

interface Props {
  children: React.ReactNode
}

const dyads = [
  ['rgba(252,118,106,1.0)', 'rgba(91,132,177,1.0)'],
  ['rgba(95,75,139,1.0)', 'rgba(230,154,141,1.0)'],
  // ['rgba(66,234,221,1.0)', 'rgba(205,181,153,1.0)'],
  ['rgba(0,164,204,1.0)', 'rgba(249,87,0,1.0)'],
  ['rgba(0,32,63,1.0)', 'rgba(173,239,209,1.0)'],
  // ['rgba(96,96,96,1.0)', 'rgba(214,237,23,1.0)'],
  ['rgba(237,43,51,1.0)', 'rgba(216,90,127,1.0)'],
  ['rgba(44,95,45,1.0)', 'rgba(151,188,98,1.0)'],
  ['rgba(0,83,156,1.0)', 'rgba(238,164,127,1.0)'],
  ['rgba(0,99,178,1.0)', 'rgba(156,195,213,1.0)'],
  ['rgba(209,152,197,1.0)', 'rgba(224,197,104,1.0)'],
  // ['rgba(203,206,145,1.0)', 'rgba(234,115,141,1.0)'],
  ['rgba(177,98,78,1.0)', 'rgba(92,200,215,1.0)'],
  ['rgba(16,24,32,1.0)', 'rgba(242,170,76,1.0)'],
  ['rgba(160,120,85,1.0)', 'rgba(212,185,150,1.0)'],
  ['rgba(25,81,144,1.0)', 'rgba(162,162,161,1.0)'],
  // ['rgba(250,208,201,1.0)', 'rgba(110,110,109,1.0)'],
  ['rgba(45,41,38,1.0)', 'rgba(233,75,60,1.0)'],
  ['rgba(218,160,61,1.0)', 'rgba(97,98,71,1.0)'],
  ['rgba(67,94,85,1.0)', 'rgba(214,65,97,1.0)'],
  // ['rgba(203,206,145,1.0)', 'rgba(118,82,139,1.0)'],
  ['rgba(0,107,56,1.0)', 'rgba(16,24,32,1.0)'],
  // ['rgba(215,196,158,1.0)', 'rgba(52,49,72,1.0)'],
  ['rgba(223,101,137,1.0)', 'rgba(60,16,83,1.0)'],
  ['rgba(221,65,50,1.0)', 'rgba(158,16,48,1.0)'],
  ['rgba(75,135,139,1.0)', 'rgba(208,28,31,1.0)'],
  ['rgba(28,28,27,1.0)', 'rgba(206,74,126,1.0)'],
  ['rgba(0,177,210,1.0)', 'rgba(0,107,56,1.0)'],
  ['rgba(121,192,0,1.0)', 'rgba(255,127,65,1.0)'],
  ['rgba(189,127,55,1.0)', 'rgba(161,57,65,1.0)'],
  ['rgba(0,35,156,1.0)', 'rgba(225,6,0,1.0)'],
]

export const ThemeProvider = ({ children }: Props) => {
  const [dyad, setDyad] = useState<string[]>([])
  useEffect(() => setDyad(dyads[(dyads.length * Math.random()) | 0]), [])
  const theme = {
    ...defaultTheme,
    fonts: {
      mono: `"Courier New", monospace`,
      serif: `"Times New Roman", Times, serif`,
      sans: `Arial, sans-serif`,
    },
    colors: {
      ...defaultTheme.colors,
      primary: dyad[0],
      secondary: dyad[1],
      primary0: dyad[0]?.replace('1.0', '0'),
      primary10: dyad[0]?.replace('1.0', '0.1'),
      primary20: dyad[0]?.replace('1.0', '0.2'),
      primary30: dyad[0]?.replace('1.0', '0.3'),
      primary40: dyad[0]?.replace('1.0', '0.4'),
      primary50: dyad[0]?.replace('1.0', '0.5'),
      primary60: dyad[0]?.replace('1.0', '0.6'),
      secondary0: dyad[1]?.replace('1.0', '0'),
      secondary10: dyad[1]?.replace('1.0', '0.1'),
      secondary20: dyad[1]?.replace('1.0', '0.2'),
      secondary30: dyad[1]?.replace('1.0', '0.3'),
      secondary40: dyad[1]?.replace('1.0', '0.4'),
      secondary50: dyad[1]?.replace('1.0', '0.5'),
      secondary60: dyad[1]?.replace('1.0', '0.6'),
    },
  }
  const siteBG = dyad[0]?.replace('1.0', '0.05')
  const selectBG = dyad[0]?.replace('1.0', '0.1')

  const GlobalStyle = createGlobalStyle`
    html {
      background-color: ${siteBG};
    }
    body {
      font-family: 'Times New Roman', Times, serif;
    }

    *::selection {
      background-color: ${selectBG};
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

    h1 {
      font-size: 3xl;
    }

    h2 {
      font-size: 3xl;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-bottom: 1rem;
      line-height: 1.1;
    }

    p {
      line-height: 1.33;
    }

    header a:hover {
      border-bottom: 2px solid ${dyad[0]};
    }
    @media screen and (max-width: sm) {
      h1, h2 {
        font-size: 2xl;
      }
    }
  `
  return (
    <XThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyle />
      {children}
    </XThemeProvider>
  )
}
