import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import './globals.css'
import ApolloWrapper from './ApolloWrapper'

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
          className={cn(
            fontZpix.variable,
            'mx-auto h-[100vh] w-[100vw] bg-slate-200'
          )}
        >
          <ApolloWrapper>{children}</ApolloWrapper>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
