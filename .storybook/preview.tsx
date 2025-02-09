import '@/app/globals.css'
import type { Preview } from '@storybook/react'
import nextIntl from './next-intl'

const preview: Preview = {
  initialGlobals: {
    locale: 'en',
    locales: {
      en: { icon: '🇺🇸', title: 'English', right: 'EN' },
      fr: { icon: '🇫🇷', title: 'Français', right: 'FR' }
    }
  },
  parameters: {
    nextIntl,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
