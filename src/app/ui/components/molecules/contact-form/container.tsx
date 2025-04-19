'use client'
import { sendContactEmail } from '@/app/actions/email'
import { ContactForm } from '@/app/ui/components/molecules/contact-form/presenter'
import type { LANGUAGE } from '@/constants'
import { useState, type FC } from 'react'

type Props = {
  translations: {
    name: string
    email: string
    message: string
    submit: string
    success: string
    error: string
    sending: string
  }
  locale: LANGUAGE
}

export const ContactFormContainer: FC<Props> = ({ translations, locale }) => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    success: false,
    message: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus({
      submitted: false,
      submitting: true,
      success: false,
      message: translations.sending
    })

    try {
      const result = await sendContactEmail({ ...formData, locale })

      if (result.success) {
        setStatus({
          submitted: true,
          submitting: false,
          success: true,
          message: translations.success
        })
        // フォームをリセット
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          submitted: true,
          submitting: false,
          success: false,
          message: result.error || translations.error
        })
      }
    } catch (error) {
      setStatus({
        submitted: true,
        submitting: false,
        success: false,
        message: translations.error
      })
    }
  }

  return <ContactForm translations={translations} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} status={status} />
}
