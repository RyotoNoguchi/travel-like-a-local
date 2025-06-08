import { ReportView } from '@/app/ui/components/atoms/anaylytics/viewcount'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ReportView> = {
  title: 'atoms/analytics/ReportView',
  component: ReportView,
  parameters: {
    nextjs: {
      appDirectory: true
    }
  },
  argTypes: {
    slug: {
      control: 'text'
    }
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    slug: 'tokyo-travel-guide'
  },
  render: (args) => (
    <div>
      <p>このコンポーネントは表示されませんが、ビューをレポートします</p>
      <p>スラッグ: {args.slug}</p>
      <ReportView {...args} />
    </div>
  )
}

export const BlogPost: Story = {
  args: {
    slug: 'best-sushi-restaurants-in-osaka'
  },
  render: (args) => (
    <div>
      <p>ブログ記事のビューレポート</p>
      <p>スラッグ: {args.slug}</p>
      <ReportView {...args} />
    </div>
  )
}

export const TourPage: Story = {
  args: {
    slug: 'kyoto-temple-tour'
  },
  render: (args) => (
    <div>
      <p>ツアーページのビューレポート</p>
      <p>スラッグ: {args.slug}</p>
      <ReportView {...args} />
    </div>
  )
}

export const ArticlePage: Story = {
  args: {
    slug: 'japanese-culture-guide'
  },
  render: (args) => (
    <div>
      <p>記事ページのビューレポート</p>
      <p>スラッグ: {args.slug}</p>
      <ReportView {...args} />
    </div>
  )
}
