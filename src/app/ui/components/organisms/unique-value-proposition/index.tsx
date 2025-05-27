import { Card } from '@/app/ui/components/atoms/card'
import type { GetUniqueValuePropositionsQuery, UniqueValueProposition } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

type Props = {
  uniqueValuePropositions: NonNullable<GetUniqueValuePropositionsQuery['uniqueValuePropositionCollection']>['items']
}

export const UniqueValuePropositionSection = ({ uniqueValuePropositions }: Props) => {
  const t = useTranslations('UniqueValuePropositionSection')
  return (
    <section className="py-10 w-full">
      <div className="w-full mx-auto text-center flex flex-col gap-5">
        <h2 className="px-4 text-3xl font-semibold">{t('title')}</h2>
        <div className="flex flex-col">
          <div className="flex items-center md:justify-evenly md:flex-row flex-col gap-8 overflow-x-scroll md:px-4 pb-5 md:pb-0">
            {uniqueValuePropositions
              .filter((proposition): proposition is UniqueValueProposition => proposition !== null)
              .map((proposition, index) => (
                <Card
                  key={index}
                  imageUrl={`${proposition?.image?.url}?w=400&h=300&fit=fill`}
                  imageAlt={proposition?.image?.title || 'Value Proposition Image'}
                  imageWidth={400}
                  imageHeight={300}
                  title={proposition?.title || ''}
                  description={proposition?.description || ''}
                  href="/about"
                  showLinkButton={false}
                  linkButtonText=""
                />
              ))}
          </div>
          <Link href="/about">
            <button className="bg-primary hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">{t('learnMore')}</button>
          </Link>
        </div>
      </div>
    </section>
  )
}
