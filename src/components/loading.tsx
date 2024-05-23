import { TypeAnimation } from 'react-type-animation'
import './loading.module.css'
import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations('Index')

  return (
    <div className='mx-auto h-10 w-full p-8 text-center'>
      <TypeAnimation
        wrapper='span'
        cursor={false}
        className='type'
        repeat={Infinity}
        speed={40}
        preRenderFirstString
        sequence={[
          t('loading'),
          800,
          `${t('loading')}.`,
          800,
          `${t('loading')}..`,
          800,
          `${t('loading')}...`,
          800
        ]}
      />
    </div>
  )
}
