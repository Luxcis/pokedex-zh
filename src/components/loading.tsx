import { TypeAnimation } from 'react-type-animation'
import './loading.module.css'

export default function Loading() {
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
          '加载中',
          800,
          '加载中.',
          800,
          '加载中..',
          800,
          '加载中...',
          800
        ]}
      />
    </div>
  )
}
