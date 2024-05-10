import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import ApolloWrapper from './ApolloWrapper'
import { NextUIProvider } from '@nextui-org/react'
import './globals.css'

const fontZpix = localFont({
  src: '../../public/fonts/zpix.ttf',
  variable: '--font-zpix',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Nextjs Starter',
  description: '',
  keywords: []
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body
          className={cn(fontZpix.variable, 'mx-aut min-h-screen bg-gray-100')}
        >
          <NextUIProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
          </NextUIProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
