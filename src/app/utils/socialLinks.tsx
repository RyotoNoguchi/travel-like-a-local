import { FacebookIcon } from '@/app/ui/components/atoms/icons/facebook-icon'
import { InstagramIcon } from '@/app/ui/components/atoms/icons/instagram-icon'
import { TikTokIcon } from '@/app/ui/components/atoms/icons/tik-tok-icon'
import { TwitterIcon } from '@/app/ui/components/atoms/icons/twitter-icon'
import { WhatsAppIcon } from '@/app/ui/components/atoms/icons/whats-app-icon'
import { YouTubeIcon } from '@/app/ui/components/atoms/icons/youtube-icon'

type Props = {
  width: number
  height: number
}

export const listSocialLinks = ({ width, height }: Props) => [
  { icon: <TwitterIcon width={width} height={height} />, href: 'https://twitter.com/your_twitter_handle' },
  { icon: <WhatsAppIcon width={width} height={height} />, href: 'https://wa.me/your_phone_number' },
  { icon: <FacebookIcon width={width} height={height} />, href: 'https://www.facebook.com/your_facebook_page' },
  { icon: <TikTokIcon width={width} height={height} />, href: 'https://www.tiktok.com/@your_tiktok_handle' },
  { icon: <YouTubeIcon width={width} height={height} />, href: 'https://www.youtube.com/channel/your_youtube_channel_id' },
  { icon: <InstagramIcon width={width} height={height} />, href: 'https://www.instagram.com/your_instagram_handle' }
]
