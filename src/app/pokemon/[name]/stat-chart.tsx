'use client'

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { Stat, StatLabel } from '@/types'

const chartConfig = {
  value: {
    label: '数值',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

const zhLabelMap: Record<StatLabel, string> = {
  hp: 'HP',
  attack: '攻击',
  defense: '防御',
  sp_attack: '特攻',
  sp_defense: '特防'
}

interface Props {
  stat: Stat
}

export function StatRadarChart({ stat }: Props) {
  const chartData = Object.keys(stat.data).map((key) => ({
    label: zhLabelMap[key as StatLabel],
    value: Number(stat.data[key as StatLabel])
  }))

  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey='label' />
        <PolarRadiusAxis domain={[0, 255]} />
        <PolarGrid />
        <Radar
          dataKey='value'
          fill='var(--color-value)'
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1
          }}
        />
      </RadarChart>
    </ChartContainer>
  )
}
