import Image from 'next/image'
import { TbPhotoQuestion } from 'react-icons/tb'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Sprites } from '@/typings'

interface Props {
  data: Sprites
}

export default function Sprites({ data }: Props) {
  const v = data.versions
  const o = data.other

  return (
    <Accordion type='single' collapsible className='w-full'>
      <AccordionItem value='main'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'主'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard url={data.front_default} title='主' />
          <SpriteCard url={data.front_female} title='雌性' />
          <SpriteCard url={data.front_shiny} title='闪' />
          <SpriteCard url={data.back_default} title='背面' />
          <SpriteCard url={data.back_shiny} title='背面-闪' />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-i'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第一世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-i']['red-blue'].front_transparent}
            title='红蓝'
          />
          <SpriteCard
            url={v['generation-i']['red-blue'].back_transparent}
            title='红蓝-背面'
          />
          <SpriteCard
            url={v['generation-i']['yellow'].front_transparent}
            title='黄'
          />
          <SpriteCard
            url={v['generation-i']['yellow'].back_transparent}
            title='黄-背面'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-ii'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第二世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-ii'].gold.front_transparent}
            title='金'
          />
          <SpriteCard
            url={v['generation-ii'].silver.front_transparent}
            title='银'
          />
          <SpriteCard
            url={v['generation-ii'].crystal.front_transparent}
            title='水晶'
          />
          <SpriteCard
            url={v['generation-ii'].crystal.front_shiny_transparent}
            title='水晶-闪'
          />
          <SpriteCard
            url={v['generation-ii'].crystal.back_transparent}
            title='水晶-背面'
          />
          <SpriteCard
            url={v['generation-ii'].crystal.back_shiny_transparent}
            title='水晶-背面-闪'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-iii'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第三世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-iii']['ruby-sapphire'].front_default}
            title='红/蓝宝石'
          />
          <SpriteCard
            url={v['generation-iii']['ruby-sapphire'].front_shiny}
            title='红/蓝宝石-闪'
          />
          <SpriteCard
            url={v['generation-iii'].emerald.front_default}
            title='绿宝石'
          />
          <SpriteCard
            url={v['generation-iii']['firered-leafgreen'].front_default}
            title='火红/叶绿'
          />
          <SpriteCard
            url={v['generation-iii']['ruby-sapphire'].back_default}
            title='红/蓝宝石-背面'
          />
          <SpriteCard
            url={v['generation-iii']['ruby-sapphire'].back_shiny}
            title='红/蓝宝石-背面-闪'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-iv'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第四世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-iv']['diamond-pearl'].front_default}
            title='钻石/珍珠'
          />
          <SpriteCard
            url={v['generation-iv'].platinum.front_default}
            title='白金'
          />
          <SpriteCard
            url={v['generation-iv'].platinum.front_shiny}
            title='白金-闪'
          />
          <SpriteCard
            url={v['generation-iv']['heartgold-soulsilver'].front_default}
            title='心金/魂银'
          />
          <SpriteCard
            url={v['generation-iv']['heartgold-soulsilver'].back_default}
            title='心金/魂银-背面'
          />
          <SpriteCard
            url={v['generation-iv'].platinum.back_shiny}
            title='白金-背面-闪'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-v'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第五世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-v']['black-white'].front_default}
            title='黑/白'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].front_shiny}
            title='黑/白-闪'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].animated.front_default}
            title='黑/白-动'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].animated.front_shiny}
            title='黑/白-动-闪'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].back_default}
            title='黑/白-动-背面'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].animated.back_default}
            title='黑/白-动-背面-动'
          />
          <SpriteCard
            url={v['generation-v']['black-white'].animated.back_shiny}
            title='黑/白-动-背面-动-闪'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-vi'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第六世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-vi']['x-y'].front_default}
            title='x/y'
          />
          <SpriteCard
            url={v['generation-vi']['x-y'].front_shiny}
            title='x/y-闪'
          />
          <SpriteCard
            url={v['generation-vi']['omegaruby-alphasapphire'].front_default}
            title='欧米茄红/阿尔法蓝宝石'
          />
          <SpriteCard
            url={v['generation-vi']['omegaruby-alphasapphire'].front_shiny}
            title='欧米茄红/阿尔法蓝宝石-闪'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-vii'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第七世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-vii']['ultra-sun-ultra-moon'].front_default}
            title='究极之日/月'
          />
          <SpriteCard
            url={v['generation-vii']['ultra-sun-ultra-moon'].front_shiny}
            title='究极之日/月-闪'
          />
          <SpriteCard
            url={v['generation-vii'].icons.front_default}
            title='icon'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='generation-viii'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'第八世代'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard
            url={v['generation-viii'].icons.front_default}
            title='icon'
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='other'>
        <AccordionTrigger className='text-gray-600'>
          <span>{'其他'}</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-row flex-wrap gap-4'>
          <SpriteCard url={o.home.front_default} title='HOME' />
          <SpriteCard url={o.home.front_shiny} title='HOME-闪' />
          <SpriteCard url={o.dream_world.front_default} title='梦境世界' />
          <SpriteCard url={o.showdown.front_default} title='Showdown' />
          <SpriteCard url={o.showdown.front_shiny} title='Showdown-闪' />
          <SpriteCard url={o.showdown.back_default} title='Showdown-背面' />
          <SpriteCard
            url={o['official-artwork'].front_default}
            title='官方艺术图'
          />
          <SpriteCard
            url={o['official-artwork'].front_shiny}
            title='官方艺术图-闪'
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function SpriteCard({ url, title }: { url: string | null; title: string }) {
  return (
    <div className='flex flex-col items-center justify-between'>
      {url ? (
        <Image
          alt='back_default'
          className='cursor-pointer p-2'
          src={url}
          style={{
            // aspectRatio: '100/100',
            objectFit: 'cover'
          }}
          height='100'
          width='100'
        />
      ) : (
        <div className='flex h-[100px] w-[100px] items-center justify-center rounded-lg'>
          <TbPhotoQuestion size={30} className='text-gray-300' />
        </div>
      )}

      <p className='text-center text-sm text-gray-600 dark:text-gray-300'>
        {title}
      </p>
    </div>
  )
}
