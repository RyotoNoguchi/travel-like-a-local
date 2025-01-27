import { FC } from 'react'
import Image from 'next/image'
import { pacifico } from '@/app/ui/fonts'
import { LOGO_TITLE, LOGO_TITLE_PREFIX, LOGO_TITLE_SUFFIX } from '@/constants'
import { AreaIcon } from '@/app/ui/icons/area-icon'
import { CategoryIcon } from '@/app/ui/icons/category-icon'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { FavoriteIcon } from '@/app/ui/icons/favorite-icon'
import { GlobeIcon } from '@/app/ui/icons/globe-icon'
import { IconButton } from '@/app/ui/icon-button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type Props = {
  logo: {
    url: string
    title: string
  }
}

export const Header: FC<Props> = ({ logo }) => {
  const t = useTranslations('Header')
  const icons = [
    { icon: <AreaIcon />, label: t('area'), href: '/area' },
    { icon: <CategoryIcon />, label: t('category'), href: '/category' },
    { icon: <SearchIcon />, label: t('search'), href: '/search' },
    { icon: <FavoriteIcon />, label: t('favorite'), href: '/favorite' },
    { icon: <GlobeIcon />, label: t('language'), href: '/language' }
  ]
  return (
    <header className='flex justify-center sm:px-1 md:px-2 lg:px-4 sm:justify-between gap-2 bg-white drop-shadow-md h-14'>
      <h1 className='flex items-center'>
        <Link href='/' className='flex items-center gap-2 hover-animation' aria-label={LOGO_TITLE}>
          <Image src={logo.url} alt={logo.title} width={40} height={40} />
          <span className={`${pacifico.className} font-bold text-xl xs:text-2xl flex gap-2 `}>
            {LOGO_TITLE_PREFIX}
            <span className='text-primary'>{LOGO_TITLE_SUFFIX}</span>
          </span>
        </Link>
      </h1>
      <nav className='hidden sm:flex items-center gap-2 text-xl'>
        {icons.map(({ icon, label, href }) => (
          <IconButton key={label} icon={icon} label={label} href={href} />
        ))}
      </nav>
    </header>
  )
}
