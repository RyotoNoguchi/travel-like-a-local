import type { GetUniqueValuePropositionsQuery, UniqueValueProposition } from '@/generated/graphql'
import { Link } from '@/i18n/routing'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
                <div
                  key={index}
                  className={classNames(
                    'shrink-0 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-all duration-200 max-w-[280px] h-[360px] sm:max-w-[320px] sm:h-[400px] md:max-w-[400px] md:h-[476px]',
                    // `${index === array.length - 1 ? 'mb-10' : ''}`,
                    'md:mb-10'
                  )}
                >
                  <Image
                    src={`${proposition?.image?.url}?w=400&h=300&fit=fill`}
                    alt={proposition?.image?.title || 'Value Proposition Image'}
                    width={400}
                    height={300}
                    className="aspect-[4/3] object-cover rounded-ss-md rounded-se-md w-full h-auto max-w-[400px]"
                  />
                  <div className="p-2 md:p-4">
                    <h3 className="text-base md:text-xl font-semibold mb-2">{proposition?.title}</h3>
                    <p className="text-xs text-gray-700 sm:text-sm lg:text-base leading-none">{proposition?.description}</p>
                  </div>
                </div>
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
