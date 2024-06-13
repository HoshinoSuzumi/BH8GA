import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './assets/**/*.{css,scss}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  darkMode: 'class',
  plugins: [
    typography,
    nextui({
      // addCommonColors: true,
      themes: {
        light: {
          colors: {
            primary: {
              50: '#F0F4FF',
              100: '#F0F4FF',
              200: '#D9E6FF',
              300: '#A6C1FF',
              400: '#598BFF',
              500: '#3366FF',
              600: '#274BDB',
              700: '#1A34B8',
              800: '#102694',
              900: '#091A7A',
              DEFAULT: '#598BFF',
              foreground: '#fff',
            },
          },
        },
        dark: {
          extend: 'light',
        },
      },
    }),
  ],
}
export default config
