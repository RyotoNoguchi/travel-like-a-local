import { AccommodationIcon } from '@/app/ui/components/atoms/icons/accommodation-icon'
import { CultureIcon } from '@/app/ui/components/atoms/icons/culture-icon'
import { EventCalendarIcon } from '@/app/ui/components/atoms/icons/event-calendar-icon'
import { FoodIcon } from '@/app/ui/components/atoms/icons/food-icon'
import { InfoIcon } from '@/app/ui/components/atoms/icons/info-icon'
import { OnsenIcon } from '@/app/ui/components/atoms/icons/onsen-icon'
import { SceneryIcon } from '@/app/ui/components/atoms/icons/scenery-icon'
import { ShopIcon } from '@/app/ui/components/atoms/icons/shop-icon'

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Food & Cuisine': <FoodIcon width={36} height={36} />,
  Shopping: <ShopIcon width={36} height={36} />,
  'Nature & Outdoors': <SceneryIcon width={36} height={36} />,
  'Culture & History': <CultureIcon width={36} height={36} />,
  Accommodation: <AccommodationIcon width={36} height={36} />,
  'Practical Information': <InfoIcon width={36} height={36} />,
  'Events & Festivals': <EventCalendarIcon width={36} height={36} />,
  'Onsen & Wellness': <OnsenIcon width={36} height={36} />
}
