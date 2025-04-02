import { AccommodationIcon } from '@/app/ui/components/atoms/icons/accommodation-icon'
import { CultureIcon } from '@/app/ui/components/atoms/icons/culture-icon'
import { EventCalendarIcon } from '@/app/ui/components/atoms/icons/event-calendar-icon'
import { FoodIcon } from '@/app/ui/components/atoms/icons/food-icon'
import { InfoIcon } from '@/app/ui/components/atoms/icons/info-icon'
import { OnsenIcon } from '@/app/ui/components/atoms/icons/onsen-icon'
import { SceneryIcon } from '@/app/ui/components/atoms/icons/scenery-icon'
import { ShopIcon } from '@/app/ui/components/atoms/icons/shop-icon'

export const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'food-and-cuisine': <FoodIcon width={36} height={36} />,
  shopping: <ShopIcon width={36} height={36} />,
  'nature-and-outdoors': <SceneryIcon width={36} height={36} />,
  'culture-and-history': <CultureIcon width={36} height={36} />,
  accommodation: <AccommodationIcon width={36} height={36} />,
  'practical-info': <InfoIcon width={36} height={36} />,
  'events-and-festivals': <EventCalendarIcon width={36} height={36} />,
  'onsen-and-wellness': <OnsenIcon width={36} height={36} />
}
