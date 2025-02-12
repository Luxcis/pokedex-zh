'use client'

import { PaginatedResponse, PokemonDetail, PokemonList, Type } from '@/types'
import { useState } from 'react'
import { fetchData, fetchDataWithoutApi } from '@/lib/fetch'
import { Combobox, Option } from '@/app/fusion/combobox'
import { Label } from '@/components/ui/label'
import TypeBadge from '@/components/type-badge'
import StatChart from '@/app/pokemon/[name]/stat-chart'
import { Record } from '@phosphor-icons/react'
import { TYPE_TABLE, TYPES } from '@/lib/constants'

export default function Page() {
  const [loaded, setLoaded] = useState(false)
  const [firstPokemonIndex, setFirstPokemonIndex] = useState<string>('')
  const [firstPokemon, setFirstPokemon] = useState<PokemonDetail>()
  const [secondPokemonIndex, setSecondPokemonIndex] = useState<string>('')
  const [secondPokemon, setSecondPokemon] = useState<PokemonDetail>()
  const [pokemonList, setPokemonList] = useState<Option[]>([])
  const loadedPokemonList = () => {
    fetchData<PaginatedResponse<PokemonList>>(
      `pokemon?page=0&pageSize=1500`
    ).then((res) => {
      setPokemonList(
        res.contents.map((p) => {
          return { index: p.index, name: p.name }
        })
      )
    })
  }
  const handleChange = (value: string) => {
    setFirstPokemonIndex(value)
    const pkm: Option = pokemonList.find((p) => p.index === value) as Option
    const key = `${pkm.index}-${pkm.name}`
    fetchDataWithoutApi<PokemonDetail>(`data/pokemon/${key}.json`).then(
      (res) => {
        setFirstPokemon(res)
      }
    )
  }
  const handleChange2 = (value: string) => {
    setSecondPokemonIndex(value)
    const pkm: Option = pokemonList.find((p) => p.index === value) as Option
    const key = `${pkm.index}-${pkm.name}`
    fetchDataWithoutApi<PokemonDetail>(`data/pokemon/${key}.json`).then(
      (res) => {
        setSecondPokemon(res)
      }
    )
  }

  if (!loaded) {
    loadedPokemonList()
    setLoaded(true)
  }
  return (
    <div>
      <div className='flex'>
        <div className='w-full border-b border-b-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
          <h1 className='font-bold'>无限融合计算器</h1>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 border-r border-r-muted p-5'>
          <div className='flex w-full items-center justify-center'>
            <Combobox
              placeholder='请选择宝可梦'
              options={pokemonList}
              value={firstPokemonIndex}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='w-1/2 border-r border-r-muted p-5'>
          <div className='flex w-full items-center justify-center'>
            <Combobox
              placeholder='请选择宝可梦'
              options={pokemonList}
              value={secondPokemonIndex}
              onChange={handleChange2}
            />
          </div>
        </div>
      </div>
      <FusionResult firstPokemon={firstPokemon} secondPokemon={secondPokemon} />
    </div>
  )
}

interface FusionResultProp {
  firstPokemon?: PokemonDetail
  secondPokemon?: PokemonDetail
}
interface FusionDetailProp {
  firstPokemon: PokemonDetail
  secondPokemon: PokemonDetail
}

function FusionResult({ firstPokemon, secondPokemon }: FusionResultProp) {
  if (firstPokemon && secondPokemon) {
    return (
      <div className='flex'>
        <FusionDetail
          firstPokemon={firstPokemon}
          secondPokemon={secondPokemon}
        />
        <FusionDetail
          firstPokemon={secondPokemon}
          secondPokemon={firstPokemon}
        />
      </div>
    )
  } else {
    return <div className='flex'></div>
  }
}

function FusionDetail({ firstPokemon, secondPokemon }: FusionDetailProp) {
  // 头部的第一属性
  // 身体存在第二属性就用第二属性否则身体的第一属性并且和头部第一属性不一致才存在第二属性
  let types = [
    firstPokemon.forms[0].types[0],
    secondPokemon.forms[0].types[secondPokemon.forms[0].types.length - 1]
  ]
  types = Array.from(new Set(types))
  // 攻击、防御、速度 种族值继承身体的2/3，继承头部的1/3
  // 特攻、特防、HP   种族值继承头部的2/3，继承身体的1/3
  const stats: PokemonDetail['stats'] = [
    {
      form: '融合',
      data: {
        hp: calc(
          secondPokemon?.stats[0]?.data?.hp as string,
          firstPokemon?.stats[0]?.data?.hp as string
        ),
        attack: calc(
          firstPokemon?.stats[0]?.data?.attack as string,
          secondPokemon?.stats[0]?.data?.attack as string
        ),
        defense: calc(
          firstPokemon?.stats[0]?.data?.defense as string,
          secondPokemon?.stats[0]?.data?.defense as string
        ),
        sp_attack: calc(
          secondPokemon?.stats[0]?.data?.sp_attack as string,
          firstPokemon?.stats[0]?.data?.sp_attack as string
        ),
        sp_defense: calc(
          secondPokemon?.stats[0]?.data?.sp_defense as string,
          firstPokemon?.stats[0]?.data?.sp_defense as string
        ),
        speed: calc(
          firstPokemon?.stats[0]?.data?.speed as string,
          secondPokemon?.stats[0]?.data?.speed as string
        )
      }
    }
  ]
  // 计算克制关系
  const calculateEffectiveness = (
    atkType: number,
    defTypes: number[]
  ): number => {
    const defense = Array.isArray(defTypes) ? defTypes : [defTypes]

    return defense.reduce((total, defTypes) => {
      // 默认1倍伤害（当未定义克制关系时）
      const multiplier = TYPE_TABLE[atkType][defTypes]
      return total * multiplier
    }, 1)
  }

  let tmpKeys: number[] = []
  const tmpMap: Record<number, Type[]> = {}
  const tmpTypes: number[] = types.map((type) => TYPES.indexOf(type))
  TYPES.filter((t) => t !== '未知').forEach((v, i) => {
    const effect = calculateEffectiveness(i, tmpTypes)
    const arr: Type[] = tmpMap[effect] || []
    arr.push(v)
    tmpMap[effect] = arr
    if (tmpKeys.indexOf(effect) === -1) {
      tmpKeys.push(effect)
    }
  })
  tmpKeys = tmpKeys.sort((k1, k2) => k2 - k1)

  return (
    <div className='w-1/2 border-r border-r-muted p-5'>
      <div className='flex w-full items-center justify-center'>
        <Label>头部：{firstPokemon.name}</Label>
        <Label className='ml-4'>身体：{secondPokemon.name}</Label>
      </div>
      <div className='mt-3 flex w-full flex-wrap items-center justify-center gap-2'>
        {types.map((type, index) => (
          <TypeBadge key={index} type={type} active={true} size='normal' />
        ))}
      </div>
      <div className='mt-3 flex w-full items-center justify-center'>
        <StatChart stats={stats} />
      </div>
      <div className='mt-5 w-full'>
        {tmpKeys.map((key) => (
          <div key={key}>
            <h2 className='mb-3 text-lg'>受到 {key}x 伤害</h2>
            <div className='mb-3 flex flex-wrap gap-2'>
              {tmpMap[key]?.map((v, i) => (
                <TypeBadge key={i} type={v} active={true} size='normal' />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function calc(firstNumber: string, secondNumber: string) {
  return (
    parseInt(
      parseInt(firstNumber) / 3 + (parseInt(secondNumber) / 3) * 2 + ''
    ) + ''
  )
}
