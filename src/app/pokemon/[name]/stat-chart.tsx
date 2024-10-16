'use client'

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { PokemonDetail, Stat, StatLabel } from '@/types'
import { Button } from '@/components/ui/button'
import { ChartBarHorizontal, Hexagon } from '@phosphor-icons/react'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
  sp_defense: '特防',
  speed: '速度'
}

interface ChartProps {
  data?: any[]
}

export function StatRadarChart({ data }: ChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square max-h-[250px]'
    >
      <RadarChart data={data}>
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

export function StatBarChart({ data }: ChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        layout='vertical'
        margin={{
          left: 0
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey='label'
          type='category'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v}
        />
        <XAxis dataKey='value' type='number' domain={[0, 255]} hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey='value'
          layout='vertical'
          radius={5}
          barSize={20}
          fill='var(--color-value)'
        >
          <LabelList
            dataKey='value'
            position='right'
            offset={8}
            className='fill-foreground'
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

function StatChart({
  stat,
  isRadarChart,
  onChartChange
}: {
  stat: Stat
  isRadarChart: boolean
  onChartChange: (v: boolean) => void
}) {
  const chartData = Object.keys(stat.data).map((key) => ({
    label: zhLabelMap[key as StatLabel],
    value: Number(stat.data[key as StatLabel])
  }))
  const { hp, attack, defense, sp_attack, sp_defense, speed } = stat.data
  const total =
    Number(hp) +
    Number(attack) +
    Number(defense) +
    Number(sp_attack) +
    Number(sp_defense) +
    Number(speed)

  return (
    <div className='h-[300px]'>
      <div className='relative flex h-8 items-center justify-center'>
        <Button
          variant='outline'
          size='icon'
          title='切换图表风格'
          className='absolute right-2 h-8 w-8'
          onClick={() => onChartChange(!isRadarChart)}
        >
          {isRadarChart ? <Hexagon /> : <ChartBarHorizontal />}
        </Button>
        <p className='text-center text-sm'>
          <span className='text-muted-foreground'>种族值: </span>
          <span> {total}</span>
        </p>
      </div>

      {isRadarChart ? (
        <StatRadarChart data={chartData} />
      ) : (
        <StatBarChart data={chartData} />
      )}
    </div>
  )
}

function StatsChart({ stats }: { stats: PokemonDetail['stats'] }) {
  const [isRadarChart, setIsRadarChart] = useState(false)

  return (
    <Tabs defaultValue={stats[0].form} className='w-full'>
      <TabsList className='w-full'>
        {stats.map((stat, index) => (
          <TabsTrigger
            key={index}
            value={stat.form}
            className='block w-28 truncate lg:w-auto'
            title={stat.form}
          >
            {stat.form}
          </TabsTrigger>
        ))}
      </TabsList>
      {stats.map((stat, index) => (
        <TabsContent key={index} value={stat.form}>
          <StatChart
            stat={stat}
            isRadarChart={isRadarChart}
            onChartChange={(v) => setIsRadarChart(v)}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default StatsChart
