'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import useMediaQuery from '@/hooks/useMediaQuery'
import type { MoveDetail as MoveDetailType } from '@/types'
import TopBar from './top-bar'
import { useRouter } from 'next/navigation'
import MoveDetail from './move-detail'
import BackButton from '@/components/back-button'

interface Props {
  data: MoveDetailType
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
        <TopBar name={data.name} />
        <MoveDetail data={data} />
        <BackButton />
      </DialogContent>
    </Dialog>
  )
}
