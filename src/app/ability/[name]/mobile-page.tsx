'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import useMediaQuery from '@/hooks/useMediaQuery'
import type { AbilityDetail as AbilityDetailType } from '@/types'
import TopBar from './top-bar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowUDownLeft } from '@phosphor-icons/react/dist/ssr'
import { useRouter } from 'next/navigation'
import AbilityDetail from './ability-detail'

interface Props {
  data: AbilityDetailType
}

export default function MobilePage({ data }: Props) {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const router = useRouter()
  if (!isMobile) return null

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back()
        }
      }}
    >
      <DialogContent className='h-full p-2'>
        <TopBar name={data.name} index={data.index} />
        <AbilityDetail data={data} />
        <Link
          href='/ability'
          className='absolute bottom-4 left-1/2 -translate-x-1/2'
        >
          <Button variant='ghost' size='icon'>
            <ArrowUDownLeft size={20} />
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
