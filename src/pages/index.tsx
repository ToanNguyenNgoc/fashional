import { Inter } from 'next/font/google'
import { Seo } from '@/components'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Seo />
      <main>
        Home page
      </main>
    </>
  )
}
