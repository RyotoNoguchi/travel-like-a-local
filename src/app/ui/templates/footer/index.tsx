import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/icons/area-icon'
import { CategoryIcon } from '@/app/ui/icons/category-icon'
import { FacebookIcon } from '@/app/ui/icons/facebook-icon'
import { FavoriteIcon } from '@/app/ui/icons/favorite-icon'
import { GlobeIcon } from '@/app/ui/icons/globe-icon'
import { InstagramIcon } from '@/app/ui/icons/instagram-icon'
import { SearchIcon } from '@/app/ui/icons/search-icon'
import { TikTokIcon } from '@/app/ui/icons/tik-tok-icon'
import { TwitterIcon } from '@/app/ui/icons/twitter-icon'
import { WhatsAppIcon } from '@/app/ui/icons/whats-app-icon'
import { YouTubeIcon } from '@/app/ui/icons/youtube-icon'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { NavLink } from '@/app/ui/templates/nav-link'
import { getNavLinks } from '@/app/utils/navLink'
import { type LANGUAGE } from '@/constants'
import { useTranslations } from 'next-intl'
import type { FC } from 'react'

type Props = {
  locale: LANGUAGE
}

export const Footer: FC<Props> = ({ locale }) => {
  const tHeader = useTranslations('NavMenu')
  const tFooter = useTranslations('Footer')
  const navLinks = getNavLinks([
    { icon: <SearchIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('search'), href: '/search' },
    { icon: <AreaIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('area'), href: '/area' },
    { icon: <CategoryIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('category'), href: '/category' },
    { icon: <FavoriteIcon width={24} height={24} color={COLORS.WHITE} />, label: tHeader('favorite'), href: '/favorite' }
  ])

  const socialLinks = (width: number, height: number) => [
    { icon: <TwitterIcon width={width} height={height} />, href: 'https://twitter.com/your_twitter_handle' },
    { icon: <WhatsAppIcon width={width} height={height} />, href: 'https://wa.me/your_phone_number' },
    { icon: <FacebookIcon width={width} height={height} />, href: 'https://www.facebook.com/your_facebook_page' },
    { icon: <TikTokIcon width={width} height={height} />, href: 'https://www.tiktok.com/@your_tiktok_handle' },
    { icon: <YouTubeIcon width={width} height={height} />, href: 'https://www.youtube.com/channel/your_youtube_channel_id' },
    { icon: <InstagramIcon width={width} height={height} />, href: 'https://www.instagram.com/your_instagram_handle' }
  ]
  return (
    <footer className="bg-dark-gray text-white h-full px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-4 justify-evenly">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{tFooter('first')}</h3>
          <nav className="flex flex-col text-xl items-start w-full">
            <ul className="flex sm:flex-col flex-wrap items-start gap-2">
              {navLinks.map(({ icon, label, href }) => (
                <li key={href}>
                  <NavLink key={label} icon={icon} label={label} href={href} gap="gap-1" withinFooter />
                </li>
              ))}
              <li className="h-7">
                <LanguageNavLink
                  icon={<GlobeIcon width={24} height={24} color={COLORS.WHITE} />}
                  label={tHeader('language')}
                  href="/language"
                  locale={locale}
                  gap="gap-1"
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{tFooter('second')}</h3>
          <ul className="flex flex-wrap sm:flex-row gap-4">
            {socialLinks(32, 32).map(({ icon, href }) => (
              <li key={href} className="hover-animation">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
