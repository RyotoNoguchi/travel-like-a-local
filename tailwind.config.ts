import type { Config } from 'tailwindcss'

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#C3281D',
        'dark-gray': '#2F353E',
        gray: '#33363F',
        'light-gray': '#EEEEEE'
      },
      screens: {
        xxs: '320px',
        xs: '390px',
        'semi-sm': '480px',
        'semi-md': '640px',
        'semi-lg': '992px'
      },
      fontSize: {
        '3.5xl': '2rem'
      }
    }
  },
  plugins: []
} satisfies Config
