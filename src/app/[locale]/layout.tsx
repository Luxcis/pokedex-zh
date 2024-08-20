import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import './globals.css'

export const fontInter = localFont({
  src: [
    {
      path: '../../../public/fonts/inter-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../../public/fonts/inter-medium.woff2',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../../public/fonts/inter-semibold.woff2',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../../public/fonts/inter-bold.woff2',
      weight: '700',
      style: 'bold'
    }
  ],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Pokedex',
  description: '',
  keywords: ['pokemon', 'pokedex']
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <ViewTransitions>
      <html lang={locale}>
        <body
          className={cn(
            fontInter.variable,
            'mx-auto min-h-screen bg-white dark:bg-neutral-900'
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <div className='sticky top-0 z-10 border-b border-b-muted'>
              <Header />
            </div>
            <div className=''>
              <Sidebar className='hidden max-h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] overflow-y-auto overflow-x-clip border-r border-r-muted md:fixed md:flex md:w-72 md:flex-col ' />
              <div className='md:pl-72'>{children}</div>
            </div>
          </NextIntlClientProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
