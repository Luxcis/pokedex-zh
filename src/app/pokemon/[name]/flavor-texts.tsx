import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FlavorText } from '@/types'

function groupData(verions: FlavorText['versions']) {
  const groups: { group: string; data: FlavorText['versions'] }[] = []
  verions.forEach((version) => {
    const exist = groups.find((g) => g.group === version.group)
    if (exist) {
      exist.data.push(version)
    } else {
      groups.push({
        group: version.group,
        data: [version]
      })
    }
  })
  return groups
}

interface Props {
  data: FlavorText[]
}

export default function FlavorTexts({ data }: Props) {
  return (
    <>
      {data.map((generation) => {
        return (
          <Accordion key={generation.name} type='single' collapsible>
            <AccordionItem value={generation.name}>
              <AccordionTrigger className='hover:no-underline'>
                {generation.name}
              </AccordionTrigger>
              <AccordionContent className=''>
                {generation.versions.map((version) => {
                  return (
                    <div key={version.name} className='mb-2 flex w-full gap-2'>
                      <div className='flex w-32 items-center'>
                        <span className='min-w-16 rounded-full bg-gray-200 px-3 py-1 text-center text-xs text-gray-700'>
                          {version.name}
                        </span>
                      </div>
                      <div className='w-[calc(100%-8rem)] flex-grow break-words'>
                        {version.text}
                      </div>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )
      })}
    </>
  )
}
