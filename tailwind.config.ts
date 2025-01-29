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
        gray: '#33363F'
      },
      screens: {
        xs: '390px',
        'semi-lg': '992px'
      }
    }
  },
  plugins: []
} satisfies Config
