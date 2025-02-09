import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/icons/area-icon'
import { CategoryIcon } from '@/app/ui/icons/category-icon'
import { FacebookIcon } from '@/app/ui/icons/facebook-icon'
import { FavoriteIcon } from '@/app/ui/icons/favorite-icon'
import { InstagramIcon } from '@/app/ui/icons/instagram-icon'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { TikTokIcon } from '@/app/ui/icons/tik-tok-icon'
import { TwitterIcon } from '@/app/ui/icons/twitter-icon'
import { WhatsAppIcon } from '@/app/ui/icons/whats-app-icon'
import { YouTubeIcon } from '@/app/ui/icons/youtube-icon'
import { getNavLinks } from '@/app/utils/navLink'
import { type LANGUAGE } from '@/constants'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'
import { Footer } from './presenter'

type Props = {
  locale: LANGUAGE
  logo: {
    url: string
    title: string
  }
}

export const FooterContainer: FC<Props> = ({ locale, logo }) => {
  const tHeader = useTranslations('NavMenu')
  const tFooter = useTranslations('Footer')
  const navLinks = getNavLinks([
    { icon: <SearchIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('search'), href: '/search' },
    { icon: <AreaIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('area'), href: '/area' },
    { icon: <CategoryIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('category'), href: '/category' },
    { icon: <FavoriteIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('favorite'), href: '/favorite' }
  ])

  const getSocialLinks = (width: number, height: number) => [
    { icon: <TwitterIcon width={width} height={height} />, href: 'https://twitter.com/your_twitter_handle' },
    { icon: <WhatsAppIcon width={width} height={height} />, href: 'https://wa.me/your_phone_number' },
    { icon: <FacebookIcon width={width} height={height} />, href: 'https://www.facebook.com/your_facebook_page' },
    { icon: <TikTokIcon width={width} height={height} />, href: 'https://www.tiktok.com/@your_tiktok_handle' },
    { icon: <YouTubeIcon width={width} height={height} />, href: 'https://www.youtube.com/channel/your_youtube_channel_id' },
    { icon: <InstagramIcon width={width} height={height} />, href: 'https://www.instagram.com/your_instagram_handle' }
  ]
  const socialLinks = getSocialLinks(32, 32)

  const footerColumnTitles = {
    first: tFooter('first'),
    second: tFooter('second'),
    subtitle: tFooter('subtitle')
  }
  const headerNavLinkTitles = {
    language: tHeader('language')
  }

  return (
    <Footer
      locale={locale}
      logo={logo}
      footerColumnTitles={footerColumnTitles}
      headerNavLinkTitles={headerNavLinkTitles}
      navLinks={navLinks}
      socialLinks={socialLinks}
    />
  )
}
