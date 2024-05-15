import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FlavorText } from '@/typings'

interface Props {
  texts: FlavorText[]
}

export default function FlavorTexts({ texts }: Props) {
  const versions = texts.map((t) => ({
    name: t.version.name,
    local_name: t.version.local_names[0].name
  }))
  const contents = texts.map((t) => t.text)

  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100'>
        Flavor Texts
      </h2>
      <Tabs className='w-full' defaultValue={versions[0]?.name}>
        <TabsList className='flex w-full border-b border-gray-200 dark:border-gray-800'>
          {versions?.map((i) => (
            <TabsTrigger value={i.name}>{i.local_name}</TabsTrigger>
          ))}
        </TabsList>
        {texts.map((t) => (
          <TabsContent value={t.version.name}>
            <div className='p-4'>
              <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
                {t.text}
              </p>
            </div>
          </TabsContent>
        ))}

        {/* <TabsContent value='red'>
          <div className='p-4'>
            <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
              When several of these Pokémon gather, their electricity could
              build and cause lightning storms.
            </p>
          </div>
        </TabsContent>
        <TabsContent value='blue'>
          <div className='p-4'>
            <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
              It stores electricity in the pouches on its cheeks. When it
              releases pent-up energy in a burst, the electric power is amazing.
            </p>
          </div>
        </TabsContent>
        <TabsContent value='yellow'>
          <div className='p-4'>
            <p className='leading-relaxed text-gray-600 dark:text-gray-400'>
              Pikachu's tail is sometimes struck by lightning as it roams. This
              Pokémon has the ability to store electricity.
            </p>
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
