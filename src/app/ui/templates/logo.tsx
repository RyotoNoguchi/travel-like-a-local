import { pacifico, zain } from '@/app/ui/fonts'
import { LOGO_TITLE_PREFIX, LOGO_TITLE_SUFFIX } from '@/constants'
import classNames from 'classnames'
import Image from 'next/image'
import type { FC } from 'react'

type Props = {
  logo: {
    url: string
    title: string
  }
  subtitle?: string
  withinFooter?: boolean
}
export const Logo: FC<Props> = ({ logo, subtitle, withinFooter = false }) => (
  <div className={`flex flex-col justify-center gap-1 ${pacifico.className}`}>
    <div className={`flex gap-2 items-center`}>
      <Image src={logo.url} alt={logo.title} width={40} height={40} className={classNames({ hidden: !withinFooter }, 'xs:block')} />
      <span className={`font-bold text-xl xs:text-2xl flex gap-2 `}>
        {LOGO_TITLE_PREFIX}
        <span className="text-primary">{LOGO_TITLE_SUFFIX}</span>
      </span>
    </div>
    {Boolean(withinFooter) && subtitle !== undefined && <span className={`text-white text-sm text-center ${zain.className}`}>{subtitle}</span>}
  </div>
)
