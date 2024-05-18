import { Skeleton } from '@/components/ui/skeleton'

export default function DetailSkeleton() {
  return (
    <div className='w-full'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8'>
        <div className='h-12 px-4'></div>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          <div className='flex flex-col items-center '>
            <Skeleton className='h-[400px] w-[400px] rounded-xl shadow-lg' />
            <div className='relative  mt-4 flex w-full items-center justify-between text-center'>
              <div className='flex w-full justify-center'>
                <Skeleton className='my-4 h-12 w-1/2 text-4xl font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                <div className='flex flex-col gap-4'></div>
              </div>
            </div>
          </div>
          <div className='space-y-8'>
            <div>
              <Skeleton className='mb-4 h-8 w-40 text-2xl font-bold text-gray-900 dark:text-gray-100'></Skeleton>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
              </div>
            </div>
            <div>
              <Skeleton className='mb-4 h-8 w-40 text-2xl font-bold text-gray-900 dark:text-gray-100'></Skeleton>
              <div className='grid grid-cols-2'>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
                <div className='rounded-lg bg-gray-100 p-4 dark:bg-gray-800'>
                  <Skeleton className='mb-2 h-8 w-24 text-sm text-gray-600 dark:text-gray-400'></Skeleton>
                  <Skeleton className='h-8 text-lg font-bold text-gray-900 dark:text-gray-100'></Skeleton>
                </div>
              </div>
            </div>
            <div>
              <Skeleton className='mb-4 h-8 w-40 text-2xl font-bold text-gray-900 dark:text-gray-100'></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
