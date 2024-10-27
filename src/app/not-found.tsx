import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex w-full flex-col items-center justify-center p-10'>
      <Image
        className='m-4'
        src='/images/dream/201Unown_QU_Dream.png'
        width={100}
        height={100}
        alt='皮卡丘'
      />
      <p className='my-5'>当前页面没有找到，去看看别的吧！</p>
      <Link href='/'>
        <Button variant='outline'>回到主页</Button>
      </Link>
    </div>
  )
}
