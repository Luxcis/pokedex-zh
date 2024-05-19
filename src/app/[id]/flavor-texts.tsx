import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { FlavorText } from '@/typings'

interface Props {
  texts: FlavorText[]
}

export default function FlavorTexts({ texts }: Props) {
  return (
    <Accordion
      type='single'
      defaultValue={texts?.[0]?.version?.local_names[0]?.name}
      collapsible
      className='w-full'
    >
      {texts.map((t, idx) => (
        <AccordionItem key={idx} value={t.version.local_names[0]?.name}>
          <AccordionTrigger className='text-gray-600'>
            <span>{t.version.local_names[0]?.name}</span>
          </AccordionTrigger>
          <AccordionContent>{t.text}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
