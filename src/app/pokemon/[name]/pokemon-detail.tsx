import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import type { PokemonDetail as PokemonDetailType } from '@/types'
import Image from 'next/image'
import TypeBadge from '@/components/type-badge'
import { StatRadarChart } from './stat-chart'
import SpriteImage from './sprite-image'

interface Props {
  className?: string
  data: PokemonDetailType
}

function PokemonDetail({ className, data }: Props) {
  // const varieties = data.varieties

  return (
    <div
      className={cn(
        className,
        'relative h-[calc(100%-49px)] w-[calc(100%-0.5rem)] items-center justify-center overflow-x-hidden p-4'
      )}
    >
      <ScrollArea className='h-full'>
        <Tabs defaultValue={data.forms[0].name} className='w-full'>
          <TabsList className='w-full'>
            {data.forms.map((form, index) => (
              <TabsTrigger key={index} value={form.name}>
                {form.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.forms.map((form, index) => (
            <TabsContent key={index} value={form.name}>
              <div className='mt-2 flex flex-col items-center justify-center gap-4'>
                {/* <FormSprites data={form} /> */}
                <Image
                  src={`/images/official/${form.image}`}
                  alt={form.name}
                  width={180}
                  height={180}
                />

                <div className='flex gap-2'>
                  {form.types.map((type) => (
                    <TypeBadge key={type} size='normal' type={type} />
                  ))}
                </div>
                <span className='rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700'>
                  {form.genus}
                </span>
                <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                  <InfoCell title='高度' value={form.height} />
                  <InfoCell title='重量' value={form.weight} />
                  <InfoCell title='体型' value={form.shape} />
                  <InfoCell
                    title='经验值'
                    value={`${form.experience.number}（${form.experience.speed}）`}
                  />
                  <InfoCell title='蛋群' value={form.egg_groups.join(',')} />
                  <InfoCell title='图鉴颜色' value={form.color} />
                  <InfoCell
                    title='捕获率'
                    value={`${form.catch_rate.number}（${form.catch_rate.rate}）`}
                  />
                  <InfoCell
                    title='性别比例'
                    value={
                      form.gender_rate
                        ? `雄性：${form.gender_rate?.male}；雌性: ${form.gender_rate?.female}`
                        : '无性别'
                    }
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
        <div className='p-4 text-sm'>
          {data.profile.split('\n').map((line, idx) => (
            <p key={idx} className='whitespace-pre-line indent-7'>
              {line}
            </p>
          ))}
        </div>
        <div>
          <Tabs defaultValue={data.stats[0].form} className='w-full'>
            <TabsList className='w-full'>
              {data.stats.map((stat, index) => (
                <TabsTrigger key={index} value={stat.form}>
                  {stat.form}
                </TabsTrigger>
              ))}
            </TabsList>
            {data.stats.map((stat, index) => (
              <TabsContent key={index} value={stat.form}>
                <StatRadarChart stat={stat} />
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className='flex w-full flex-row flex-wrap items-center justify-center gap-4'>
          {data.home_images.map((item, idx) => (
            <SpriteImage key={idx} data={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default PokemonDetail

function InfoCell({ title, value }: { title: string; value: string }) {
  return (
    <div className='flex items-center rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800'>
      <div className='w-16 text-sm text-muted-foreground'>{title}</div>
      <span className='text-sm font-medium '>{value}</span>
    </div>
  )
}
