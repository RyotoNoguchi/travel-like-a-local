import type { NextPage } from 'next'

export const generateMetadata = async () => {
  return {
    title: 'About Page'
  }
}

const AboutPage: NextPage = () => {
  return <div>About</div>
}

export default AboutPage
