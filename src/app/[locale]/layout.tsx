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
import { CollpasableNav, Nav } from '@/components/nav'
import { useState } from 'react'
import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'

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
            <ResizablePanelGroup
              direction='horizontal'
              // onLayout={(sizes: number[]) => {
              //   document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
              //     sizes
              //   )}`
              // }}
              className='h-full max-h-[800px] items-stretch'
            >
              <CollpasableNav />
            </ResizablePanelGroup>
          </NextIntlClientProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
