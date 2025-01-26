import { FC } from 'react'
import Image from 'next/image'
import { pacifico } from '@/app/ui/fonts'
import { LOGO_TITLE } from '@/constants'

type Props = {
  logo: {
    url: string
    title: string
  }
}

export const Header: FC<Props> = ({ logo }) => (
  <header className='flex justify-center gap-2 bg-white drop-shadow-md h-14'>
    <h1 className='flex items-center gap-2'>
      <Image src={logo.url} alt={logo.title} width={40} height={40} />
      <span className={`${pacifico.className} font-bold text-xl xs:text-2xl`}>{LOGO_TITLE}</span>
    </h1>
  </header>
)
