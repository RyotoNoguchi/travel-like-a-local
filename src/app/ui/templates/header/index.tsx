import { COLORS } from '@/app/ui/colors'
import { AreaIcon } from '@/app/ui/components/atoms/icons/area-icon'
import { CategoryIcon } from '@/app/ui/components/atoms/icons/category-icon'
import { FavoriteIcon } from '@/app/ui/components/atoms/icons/favorite-icon'
import { GlobeIcon } from '@/app/ui/components/atoms/icons/globe-icon'
import { SearchIcon } from '@/app/ui/components/atoms/icons/search-icon'
import { CategoryNav } from '@/app/ui/templates/header/category-nav'
import { HamburgerMenu } from '@/app/ui/templates/header/hamburger-menu'
import { LanguageNavLink } from '@/app/ui/templates/language-nav-link'
import { Logo } from '@/app/ui/templates/logo'
import { NavLink } from '@/app/ui/templates/nav-link'
import { type LANGUAGE, LOGO_TITLE } from '@/constants'
import { Link } from '@/i18n/routing'
import { getConceptSchemes } from '@/lib/contentful/get-concept-schemes'
import { getConcepts } from '@/lib/contentful/get-concepts'
import classNames from 'classnames'
import { getTranslations } from 'next-intl/server'
import type { FC } from 'react'

type Category = {
  id: string
  label: string
  parentIds: string[]
}

type Props = {
  logo: {
    url: string
    title: string
  }
  locale: LANGUAGE
}

export const Header: FC<Props> = async ({ logo, locale }) => {
  const tHeader = await getTranslations('NavMenu')
  const tFooter = await getTranslations('Footer')

  // Get Category Information
  const concepts = await getConcepts()
  const conceptSchemes = await getConceptSchemes()
  const categoryScheme = conceptSchemes.find((scheme) => scheme.label.toLowerCase().includes('categories'))

  // Create Category Hierarchy
  const categories = categoryScheme
    ? categoryScheme.conceptIds
        .map((conceptId) => {
          const concept = concepts.find((c) => c.id === conceptId)
          return {
            id: conceptId,
            label: concept?.label || '',
            parentIds: concept?.upperLevelConceptIds || []
          }
        })
        .filter((category) => category.label !== '')
    : []
  // Extract Top Level Categories
  const topLevelCategories: Category[] = categories.filter((category) => category.parentIds.length === 0)

  const listNavLinks = (px: number) => [
    { icon: <SearchIcon width={px} height={px} color={COLORS.GRAY} />, label: tHeader('search'), href: '/search' },
    { icon: <AreaIcon width={px} height={px} color={COLORS.GRAY} />, label: tHeader('area'), href: '/area' },
    {
      icon: <CategoryIcon width={px} height={px} color={COLORS.GRAY} />,
      label: tHeader('category'),
      href: '/category',
      isCategory: true
    },
    { icon: <FavoriteIcon width={px} height={px} color={COLORS.GRAY} />, label: tHeader('favorite'), href: '/favorite' }
  ]
  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-40',
        'flex justify-between gap-2 bg-white drop-shadow-md h-14 px-3',
        'sm:justify-between sm:px-1',
        'md:px-2',
        'lg:px-4 lg:justify-between'
      )}
    >
      <Link href="/" className="flex items-center gap-2 hover-animation" aria-label={LOGO_TITLE}>
        <Logo logo={logo} subtitle={tFooter('subtitle')} />
      </Link>
      <div className="flex gap-1">
        <nav className="hidden sm:flex text-xl items-center">
          <ul className="flex items-start gap-2">
            {listNavLinks(24).map(({ icon, label, href, isCategory }) => (
              <li key={href}>
                {isCategory ? (
                  <CategoryNav icon={icon} label={label} href={href} gap="gap-0" categories={topLevelCategories} />
                ) : (
                  <NavLink key={label} icon={icon} label={label} href={href} gap="gap-0" />
                )}
              </li>
            ))}
            <li className="h-7">
              <LanguageNavLink
                icon={<GlobeIcon width={24} height={24} color={COLORS.GRAY} />}
                label={tHeader('language')}
                href="/language"
                locale={locale}
                gap="gap-0"
              />
            </li>
          </ul>
        </nav>
        <HamburgerMenu navLinks={listNavLinks(32)} locale={locale} />
      </div>
    </header>
  )
}
