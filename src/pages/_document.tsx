import { FacebookMessengerChat } from '@/components'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
      <FacebookMessengerChat attribution="biz_inbox" pageId="174304060167302" />
    </Html>
  )
}
