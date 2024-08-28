import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import './globals.css'

export const fontInter = localFont({
  src: [
    {
      path: '../../public/fonts/inter-regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../public/fonts/inter-medium.woff2',
      weight: '500',
      style: 'medium'
    },
    {
      path: '../../public/fonts/inter-semibold.woff2',
      weight: '600',
      style: 'semibold'
    },
    {
      path: '../../public/fonts/inter-bold.woff2',
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
  children
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <ViewTransitions>
      <html lang={locale}>
        <body
          className={cn(
            fontInter.variable,
            'mx-auto bg-white font-sans text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400'
          )}
        >
          <NextIntlClientProvider messages={messages}>
            <div className='sticky top-0 z-10 border-b border-b-muted'>
              <Header />
            </div>
            <div className='flex h-[calc(100vh-65px)] min-h-[calc(100vh-65px)] '>
              <Sidebar className='hidden border-r border-r-muted md:flex md:w-64' />
              <div className='h-full px-4 md:w-[calc(100vw-16rem)] lg:pl-0'>
                {children}
              </div>
            </div>
          </NextIntlClientProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
