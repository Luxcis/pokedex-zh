'use client'

import { useTranslations } from 'next-intl'

export default function IndexPage({ params }: { params: { locale: any } }) {
  const t = useTranslations('Index')

  return (
    <main className='flex min-h-[calc(100vh-65px)] flex-col items-center px-5 pb-8 pt-2 md:px-8'>
      <div>Home</div>
    </main>
  )
}
