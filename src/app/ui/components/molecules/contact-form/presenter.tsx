import type { FC } from 'react'

type Props = {
  translations: {
    title: string
    name: string
    email: string
    message: string
    submit: string
    sending: string
    success: string
    error: string
  }
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  formData: {
    name: string
    email: string
    message: string
  }
  status: {
    submitted: boolean
    submitting: boolean
    success: boolean
    message: string
  }
}

export const ContactForm: FC<Props> = ({ translations, handleSubmit, handleChange, formData, status }) => (
  <form onSubmit={handleSubmit} className="space-y-6 w-full mb-10 px-5 max-w-screen-md mx-auto md:px-0">
    <h2 id="contact" className="text-2xl font-bold text-gray-800 text-center">
      {translations.title}
    </h2>
    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
      <div>
        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
          {translations.name}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="John Smith"
          required
          disabled={status.submitting}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
          {translations.email}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          placeholder="john@example.com"
          required
          disabled={status.submitting}
        />
      </div>
    </div>

    <div>
      <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
        {translations.message}
      </label>
      <textarea
        id="message"
        value={formData.message}
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
        placeholder="Tell us about your travel plans and how we can help..."
        required
        disabled={status.submitting}
      ></textarea>
    </div>

    {Boolean(status.submitted) && (
      <div className={`p-4 rounded-md ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status.message}</div>
    )}

    <div className="flex justify-center">
      <button
        type="submit"
        disabled={status.submitting}
        className={`
          bg-primary-600 text-white font-semibold py-3 px-8 rounded-md
          hover:bg-primary-700 transition duration-300 shadow-md
          ${status.submitting ? 'opacity-70 cursor-not-allowed' : ''}
        `}
      >
        {status.submitting ? translations.sending : translations.submit}
      </button>
    </div>
  </form>
)
