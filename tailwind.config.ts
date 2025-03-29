import type { Config } from 'tailwindcss'

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#C3281D',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#921212',
          900: '#7f1d1d'
        },
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
