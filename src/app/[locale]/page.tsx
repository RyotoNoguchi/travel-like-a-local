import { ArticleListContainer } from '@/app/ui/article-list/container'
import { CarouselContainer } from '@/app/ui/components/organisms/carousel/container'
import { HeroContainer } from '@/app/ui/hero/container'
import { PopularArticleListContainer } from '@/app/ui/popular-article-list/container'
import { RichText } from '@/app/ui/rich-text'
import { LOGO_TITLE, type LANGUAGE } from '@/constants'
import type { Metadata, NextPage } from 'next'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: LANGUAGE }>
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale } = await params
  // Ref: https://next-intl.dev/docs/environments/actions-metadata-route-handlers
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: `${t('home')} | ${LOGO_TITLE}`,
    description: t('description')
  }
}

const HomePage: NextPage<Props> = async ({ params }) => {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Hero' })
  const articleListT = await getTranslations({ locale, namespace: 'ArticleList' })
  const popularArticleListT = await getTranslations({ locale, namespace: 'PopularArticleList' })
  const articleT = await getTranslations({ locale, namespace: 'Article' })

  return (
    <>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <HeroContainer enrichedTitle={<RichText>{(tags) => t.rich('title', { ...tags })}</RichText>} enrichedSubtitle={t('subtitle')} />
        <CarouselContainer width={300} height={200} />
        <div className="flex w-full justify-center gap-8 lg:gap-16 px-4">
          <ArticleListContainer title={articleListT('title')} viewAll={articleListT('viewAll')} />
          <PopularArticleListContainer title={popularArticleListT('title')} viewCountText={articleT('views')} />
        </div>
        {/* <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority /> */}
        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}

        {/* <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image className="dark:invert" src="/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div> */}
      </main>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer> */}
    </>
  )
}

export default HomePage
