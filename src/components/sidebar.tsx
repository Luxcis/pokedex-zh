'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { HTMLAttributes } from 'react'
import {
  House,
  PawPrint,
  HandPalm,
  Lightbulb,
  Backpack,
  GithubLogo
} from '@phosphor-icons/react'
import { Link, usePathname } from '@/navigation'

export const mainNavigation = [
  { name: 'Home', href: '/', icon: House },
  { name: 'Pokemon', href: '/pokemon', icon: PawPrint },
  { name: 'Ability', href: '/ability', icon: HandPalm },
  { name: 'Move', href: '/move', icon: Lightbulb },
  { name: 'Item', href: '/item', icon: Backpack }
]

export const SidebarCategory = ({ children }: { children: string }) => (
  <h2 className='mb-2 mt-4 px-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
    {children}
  </h2>
)

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('pb-12', className)}>
      <div className='grid w-72 grid-cols-3 gap-2 px-3 pt-4'>
        <Button variant='outline'>
          <GithubLogo size={18} />
        </Button>
        <Button variant='outline'>
          <GithubLogo size={18} />
        </Button>
      </div>
      <nav className='px-3 pb-2'>
        <SidebarCategory>Home</SidebarCategory>
        <div className='space-y-1'>
          {mainNavigation.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                item.href === pathname
                  ? ''
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className='mr-4 h-4 w-4' aria-hidden='true' />
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}
