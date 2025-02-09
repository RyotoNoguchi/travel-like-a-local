import type { Preview } from '@storybook/react'
// import { NextIntlClientProvider } from 'next-intl'
// import { getMessages } from 'next-intl/server'

const preview: Preview = {
  // decorators: [
  //   async (Story) => {
  //     const messages = await getMessages({ locale: 'fr' })
  //     return (
  //       <NextIntlClientProvider messages={messages}>
  //         <Story />
  //       </NextIntlClientProvider>
  //     )
  //   }
  // ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
