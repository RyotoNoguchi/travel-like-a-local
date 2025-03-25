import { GoogleLoginButton } from '@/app/ui/components/molecules/login/google-login-button'
import { Logo } from '@/app/ui/templates/logo'
import type { LANGUAGE } from '@/constants'
import { getLogo } from '@/utils/logo'
import type { NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: { locale: LANGUAGE }
}

const SignInPage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Auth' })
  const logo = await getLogo({ width: 500, height: 500 })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      {logo !== null && (
        <h1>
          <Logo logo={logo} />
        </h1>
      )}
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold">{t('signIn')}</h2>
        <GoogleLoginButton locale={locale} />
      </div>
    </div>
  )
}

export default SignInPage
