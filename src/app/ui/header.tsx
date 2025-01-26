import { FC } from 'react'
import Image from 'next/image'

type Props = {
  logo: {
    url: string
    title: string
  }
}

export const Header: FC<Props> = ({ logo }) => (
  <header className='flex gap-2 bg-white drop-shadow-sm'>
    <Image src={logo.url} alt={logo.title} width={40} height={40} />
  </header>
)
