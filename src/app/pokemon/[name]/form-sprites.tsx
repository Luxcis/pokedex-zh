'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Toggle } from '@/components/ui/toggle'
import { PokemonDetail } from '@/types'
import { GenderFemale, GenderMale, Sparkle } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

interface Props {
  data: PokemonDetail
}

function FormSprites({ data }: Props) {
  const [isShiny, setIsShiny] = useState(false)
  const [isFemale, setIsFemale] = useState(false)
  const [current, setCurrent] = useState(0)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className=''>
      <Carousel className='w-full max-w-xs' setApi={setApi}>
        <CarouselContent>
          {data.forms.map((form, index) => (
            <CarouselItem key={index}>
              <div className='flex flex-col gap-2 p-1'>
                <div className='flex flex-row justify-end gap-2'>
                  <Toggle
                    variant='default'
                    className='h-8 w-8 bg-transparent p-2'
                    pressed={isFemale}
                    onPressedChange={(v) => {
                      setIsFemale(v)
                    }}
                  >
                    {isFemale ? (
                      <GenderFemale
                        className='h-6 w-6'
                        weight='bold'
                        color='#fb7185'
                      />
                    ) : (
                      <GenderMale
                        className='h-6 w-6'
                        weight='bold'
                        color='#0ea5e9'
                      />
                    )}
                  </Toggle>
                  <Toggle
                    variant='default'
                    className='h-8 w-8 p-2'
                    pressed={isShiny}
                    onPressedChange={(v) => {
                      setIsShiny(v)
                    }}
                  >
                    <Sparkle
                      className='h-6 w-6'
                      weight='bold'
                      color={isShiny ? 'orange' : 'gray'}
                    />
                  </Toggle>
                </div>
                <Card>
                  <CardContent className='flex aspect-square items-center justify-center p-2'>
                    <img
                      src={
                        isShiny
                          ? isFemale
                            ? form.sprites.front_home_shiny_female ||
                              form.sprites.front_home_shiny
                            : form.sprites.front_home_shiny
                          : isFemale
                            ? form.sprites.front_home_female ||
                              form.sprites.front_home
                            : form.sprites.front_home
                      }
                      alt={form.name_local || form.name_en}
                      className='h-36 w-36 object-contain'
                    />
                  </CardContent>
                </Card>
                <h3 className='text-center font-bold'>
                  {form.name_local || form.name_en}
                </h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className='flex flex-row gap-2'>
        {data.forms[current].types.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </div>
    </div>
  )
}

export default FormSprites
