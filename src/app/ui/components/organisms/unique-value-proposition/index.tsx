import { Button } from '@/app/ui/components/atoms/button'
import { Card } from '@/app/ui/components/atoms/card'
import type { GetUniqueValuePropositionsQuery, UniqueValueProposition } from '@/generated/graphql'
import classNames from 'classnames'
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
        <div className="flex flex-col gap-4">
          <ul className={classNames('flex flex-col gap-4 items-center', 'md:flex-row md:justify-center md:gap-8')}>
            {uniqueValuePropositions
              .filter((proposition): proposition is UniqueValueProposition => proposition !== null)
              .map((proposition, index) => (
                <Card
                  key={index}
                  imageUrl={`${proposition?.image?.url}`}
                  imageAlt={proposition?.image?.title || 'Value Proposition Image'}
                  title={proposition?.title || ''}
                  description={proposition?.description || ''}
                  href="/about"
                  showLinkButton={false}
                  linkButtonText=""
                />
              ))}
          </ul>
          <div className="w-fit mx-auto">
            <Button borderRadius="rounded-md" text={t('learnMore')} href="/about" variant="solid" />
          </div>
        </div>
      </div>
    </section>
  )
}
