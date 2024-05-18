import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toIndexString(num: number): string {
  let numberString = num.toString()
  numberString = numberString.padStart(4, '0')
  return `#${numberString}`
}
