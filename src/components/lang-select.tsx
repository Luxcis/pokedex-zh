import { useLocale, useTranslations } from 'next-intl'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Locale } from '@/config'
import { setUserLocale } from '@/services/locale'

export default function LangSelect() {
  const locale = useLocale()
  const t = useTranslations('Settings')

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        const locale = value as Locale
        setUserLocale(locale)
      }}
    >
      <SelectTrigger id='language' className='w-[180px]'>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        {['en', 'zh-Hans'].map((lang) => (
          <SelectItem key={lang} value={lang}>
            {t(`locales.${lang}`)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
