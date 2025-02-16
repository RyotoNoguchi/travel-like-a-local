'use client'
import '@/app/globals.css'
import Image from 'next/image'
import type { FC } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {
  blogs: {
    slug: string
    featuredImage: {
      url: string
      title: string
    }
  }[]
}

export const Carousel: FC<Props> = ({ blogs }) => (
  <Swiper
    height={200}
    tag="div"
    wrapperTag="ul"
    modules={[Navigation, Pagination, Autoplay, Scrollbar]}
    spaceBetween={10}
    scrollbar={false}
    slidesPerView={1}
    breakpoints={{
      480: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      1024: {
        slidesPerView: 4
      }
    }}
    grabCursor
    navigation={false}
    pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet' }}
    autoplay={false}
    className="flex w-full"
    wrapperClass="mb-10"
  >
    {blogs.map((blog) => (
      <SwiperSlide
        key={blog.slug}
        tag="li"
        className="flex justify-center items-center focus:outline-none"
        style={{ display: 'flex', marginLeft: 0, marginRight: 0 }}
      >
        <Image className="rounded-xl" src={blog.featuredImage.url} alt={blog.featuredImage.title} width={300} height={200} />
      </SwiperSlide>
    ))}
  </Swiper>
)
