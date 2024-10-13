import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { MoveDetail as MoveDetailType } from '@/types'
import TypeBadge from '@/components/type-badge'
import { PropsWithChildren } from 'react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import CategoryBadge from '@/components/category-badge'

interface Props {
  className?: string
  data: MoveDetailType
}

function MoveDetail({ className, data }: Props) {
  return (
    <div
      className={cn(
        className,
        'relative h-[calc(100%-49px)] w-[calc(100%-0.5rem)] items-center justify-center overflow-x-hidden p-2 lg:p-4'
      )}
    >
      <ScrollArea className='h-full'>
        <div className='mt-2 flex flex-col items-center justify-center gap-4'>
          <section className='flex gap-2'>
            <TypeBadge size='normal' type={data.type} />
            <CategoryBadge size='normal' type={data.category} />
          </section>

          <section className='mt-2 indent-7 text-sm'>
            <p>
              {data.name}（日文︰{data.name_jp}，英文︰{data.name_en}）是
              {data.generation}引入的宝可梦的招式。
            </p>
            <p>{data.text}</p>
          </section>
        </div>

        <SectionTitle>效果</SectionTitle>
        <section className='text-sm'>
          {data.effect.split('\n').map((line, idx) => (
            <p key={idx} className='whitespace-pre-line indent-7'>
              {line}
            </p>
          ))}
        </section>
        <SectionTitle>范围</SectionTitle>
        <section className='text-sm'>
          <p className='whitespace-pre-line indent-7'>{data.range}。</p>
        </section>
        <SectionTitle>基本信息</SectionTitle>
        <section className='text-sm'>
          <ul
            role='list'
            className='marker:text-primary-400 list-disc space-y-2 pl-5'
          >
            {data.info.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        </section>
        <SectionTitle>可以学会该招式的宝可梦</SectionTitle>
      </ScrollArea>
    </div>
  )
}

export default MoveDetail

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <>
      <Separator className='my-4 mt-6' />
      <h2 className='mb-4 mt-2 font-bold'>{children}</h2>
    </>
  )
}
