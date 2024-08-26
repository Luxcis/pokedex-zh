'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Backpack,
  HandPalm,
  House,
  Icon,
  Lightbulb,
  PawPrint
} from '@phosphor-icons/react'
import { ResizablePanel } from './ui/resizable'
import { useLayoutStore } from '@/store'

interface NavProps {
  isCollapsed: boolean
  // links: {
  //   title: string
  //   label?: string
  //   icon: Icon
  //   variant: 'default' | 'ghost'
  // }[]
}

const links: {
  title: string
  label?: string
  icon: Icon
  variant: 'default' | 'ghost'
}[] = [
  {
    title: 'Inbox',
    label: '128',
    icon: House,
    variant: 'default'
  },
  {
    title: 'Drafts',
    label: '9',
    icon: PawPrint,
    variant: 'ghost'
  },
  {
    title: 'Sent',
    label: '',
    icon: HandPalm,
    variant: 'ghost'
  },
  {
    title: 'Junk',
    label: '23',
    icon: Lightbulb,
    variant: 'ghost'
  },
  {
    title: 'Trash',
    label: '',
    icon: Backpack,
    variant: 'ghost'
  }
]

export function Nav() {
  const { collapsed, setCollapsed } = useLayoutStore((state) => state)

  return (
    <div
      data-collapsed={collapsed}
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {links.map((link, index) =>
          collapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href='#'
                  className={cn(
                    buttonVariants({ variant: link.variant, size: 'icon' }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                  )}
                >
                  <link.icon className='h-4 w-4' />
                  <span className='sr-only'>{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side='right' className='flex items-center gap-4'>
                {link.title}
                {link.label && (
                  <span className='ml-auto text-muted-foreground'>
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href='#'
              className={cn(
                buttonVariants({ variant: link.variant, size: 'sm' }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start'
              )}
            >
              <link.icon className='mr-2 h-4 w-4' />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white'
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}

// const defaultLayout = [20, 32, 48]
// const navCollapsedSize = 4

// export function CollpasableNav() {
//   const { collapsed, setCollapsed } = useLayoutStore((state) => state)

//   return (
//     <ResizablePanel
//       defaultSize={defaultLayout[0]}
//       collapsedSize={navCollapsedSize}
//       collapsible={true}
//       minSize={15}
//       maxSize={20}
//       onCollapse={() => {
//         setCollapsed(true)
//         document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//           true
//         )}`
//       }}
//       onResize={() => {
//         setCollapsed(false)
//         document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
//           false
//         )}`
//       }}
//       className={cn(
//         collapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
//       )}
//     >
//       <Nav isCollapsed={collapsed} />
//     </ResizablePanel>
//   )
// }
