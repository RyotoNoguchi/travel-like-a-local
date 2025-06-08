import { ContactForm } from '@/app/ui/components/molecules/contact-form/presenter'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof ContactForm> = {
  title: 'molecules/ContactForm',
  component: ContactForm,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    handleSubmit: {
      action: 'form submitted'
    },
    handleChange: {
      action: 'input changed'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

const defaultTranslations = {
  title: 'お問い合わせ',
  name: 'お名前',
  email: 'メールアドレス',
  message: 'メッセージ',
  submit: '送信する',
  sending: '送信中...',
  success: 'お問い合わせありがとうございます。近日中にご連絡いたします。',
  error: '送信に失敗しました。もう一度お試しください。'
}

const defaultFormData = {
  name: '',
  email: '',
  message: ''
}

const defaultStatus = {
  submitted: false,
  submitting: false,
  success: false,
  message: ''
}

const defaultProps = {
  translations: defaultTranslations,
  formData: defaultFormData,
  status: defaultStatus,
  handleSubmit: () => {},
  handleChange: () => {}
}

export const Default: Story = {
  args: defaultProps
}

export const Filled: Story = {
  args: {
    ...defaultProps,
    formData: {
      name: '田中太郎',
      email: 'tanaka@example.com',
      message: '京都の桜の名所について詳しく教えてください。特に穴場スポットがあれば知りたいです。'
    }
  }
}

export const Submitting: Story = {
  args: {
    ...defaultProps,
    formData: {
      name: '山田花子',
      email: 'yamada@example.com',
      message: '大阪のグルメツアーに参加したいのですが、詳細を教えてください。'
    },
    status: {
      submitted: false,
      submitting: true,
      success: false,
      message: ''
    }
  }
}

export const Success: Story = {
  args: {
    ...defaultProps,
    formData: {
      name: '佐藤次郎',
      email: 'sato@example.com',
      message: 'ありがとうございました。'
    },
    status: {
      submitted: true,
      submitting: false,
      success: true,
      message: defaultTranslations.success
    }
  }
}

export const Error: Story = {
  args: {
    ...defaultProps,
    formData: {
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      message: '温泉旅行の計画を立てているのですが、おすすめの場所はありますか？'
    },
    status: {
      submitted: true,
      submitting: false,
      success: false,
      message: defaultTranslations.error
    }
  }
}

export const EnglishVersion: Story = {
  args: {
    ...defaultProps,
    translations: {
      title: 'Contact Us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you for your message. We will get back to you soon.',
      error: 'Failed to send message. Please try again.'
    },
    formData: {
      name: 'John Smith',
      email: 'john@example.com',
      message: 'I am interested in visiting traditional temples in Kyoto. Could you recommend some must-see places?'
    }
  }
}

export const InteractiveDemo: Story = {
  render: () => {
    const [formData, setFormData] = useState(defaultFormData)
    const [status, setStatus] = useState(defaultStatus)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [id]: value
      }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setStatus({
        submitted: false,
        submitting: true,
        success: false,
        message: ''
      })

      // シミュレートされた送信処理
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3 // 70%の確率で成功
        setStatus({
          submitted: true,
          submitting: false,
          success: isSuccess,
          message: isSuccess ? defaultTranslations.success : defaultTranslations.error
        })

        if (isSuccess) {
          setFormData(defaultFormData) // 成功時はフォームをリセット
        }
      }, 2000)
    }

    return <ContactForm translations={defaultTranslations} formData={formData} status={status} handleSubmit={handleSubmit} handleChange={handleChange} />
  }
}
