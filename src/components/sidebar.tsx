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
  GearSix
} from '@phosphor-icons/react'
import { SettingsSheet } from './settings-sheet'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const mainNavigation = [
  { label: '首页', href: '/', icon: House },
  { label: '图鉴', href: '/pokemon', icon: PawPrint },
  { label: '特性', href: '/ability', icon: Lightbulb },
  { label: '招式', href: '/move', icon: HandPalm },
  { label: '道具', href: '/item', icon: Backpack }
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
    <div
      className={cn(
        'relative flex h-full flex-col justify-between pb-4',
        className
      )}
    >
      <nav className='px-3 pb-2'>
        {/* <SidebarCategory>Home</SidebarCategory> */}
        <div className='space-y-1'>
          {mainNavigation.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'default' : 'ghost'}
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
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </nav>
      {/* <nav className='px-3 pt-2'>
        <SettingsSheet>
          <Button
            variant='ghost'
            className='w-full justify-start text-neutral-600 dark:text-neutral-400'
            asChild
          >
            <div className='cursor-pointer'>
              <GearSix size={18} className='mr-4 h-4 w-4' aria-hidden='true' />
              设置
            </div>
          </Button>
        </SettingsSheet>
      </nav> */}
    </div>
  )
}
