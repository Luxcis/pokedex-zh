import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { SpeciesDetail } from '@/types'

interface Props {
  className?: string
  data: SpeciesDetail
}

function PokemonDetail({ className, data }: Props) {
  const varieties = data.varieties

  return (
    <div
      className={cn(
        className,
        'relative w-[calc(100%-0.5rem)] items-center justify-center overflow-x-hidden'
      )}
    >
      <Tabs defaultValue={varieties[0].name} className='w-full'>
        <ScrollArea className='w-full text-center'>
          <TabsList className='w-full'>
            {varieties.map((variety, index) => (
              <TabsTrigger key={index} value={variety.name}>
                {variety.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
        {varieties.map((variety, index) => (
          <TabsContent key={index} value={variety.name}>
            <div className='flex items-center justify-center'>
              <img
                src={variety.sprites.other.home.front_default}
                alt={variety.name}
                className='h-48 w-48 object-contain'
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export default PokemonDetail
