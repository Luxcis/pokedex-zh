'use client'

import { TYPE_TABLE, TYPES } from '@/lib/constants'
import TypeBadge from '@/components/type-badge'
import { Type } from '@/types'
import { useEffect, useState } from 'react'
import { Record } from '@phosphor-icons/react'

export default function Page() {
  const [defenseType1, setDefenseType1] = useState<Type>('一般')
  const [defenseType2, setDefenseType2] = useState<Type>('未知')
  const [defenseMap, setDefenseMap] = useState<Record<number, Type[]>>({})
  const [defenseKeys, setDefenseKeys] = useState<number[]>([])
  const [attackType, setAttackType] = useState<Type>('一般')
  const [attackMap, setAttackMap] = useState<Record<number, Type[]>>({})
  const [attackKeys, setAttackKeys] = useState<number[]>([])
  const [loaded, setLoaded] = useState(false)
  // 防御克制计算
  const handleDefenseTypeClick1 = (type: Type) => {
    if (type === defenseType2) {
      setDefenseType2('未知')
    }
    setDefenseType1(type)
  }
  const handleDefenseTypeClick2 = (type: Type) => {
    if (type === defenseType1) {
      setDefenseType2('未知')
    } else {
      setDefenseType2(type)
    }
  }
  const onDefenseTypeChange = () => {
    const tmpKeys: number[] = []
    const tmpMap: Record<number, Type[]> = {}
    TYPES.filter((t) => t !== '未知').forEach((v, i) => {
      const defTypes = [TYPES.indexOf(defenseType1)]
      if (TYPES.indexOf(defenseType2) < TYPES.length - 1) {
        defTypes.push(TYPES.indexOf(defenseType2))
      }
      const effect = calculateEffectiveness(i, defTypes)

      const arr: Type[] = tmpMap[effect] || []
      arr.push(v)
      tmpMap[effect] = arr
      if (tmpKeys.indexOf(effect) === -1) {
        tmpKeys.push(effect)
      }
    })
    setDefenseMap(tmpMap)
    setDefenseKeys(tmpKeys.sort((k1, k2) => k2 - k1))
  }
  // 进攻克制计算
  const handleAttackTypeClick = (type: Type) => {
    setAttackType(type)
  }
  const onAttackTypeChange = () => {
    const tmpKeys: number[] = []
    const tmpMap: Record<number, Type[]> = {}
    TYPES.filter((t) => t !== '未知').forEach((v, i) => {
      const defTypes = [i]
      const effect = calculateEffectiveness(TYPES.indexOf(attackType), defTypes)

      const arr: Type[] = tmpMap[effect] || []
      arr.push(v)
      tmpMap[effect] = arr
      if (tmpKeys.indexOf(effect) === -1) {
        tmpKeys.push(effect)
      }
    })
    setAttackMap(tmpMap)
    setAttackKeys(tmpKeys.sort((k1, k2) => k2 - k1))
  }

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

  if (!loaded) {
    onDefenseTypeChange()
    onAttackTypeChange()
    setLoaded(true)
  }

  useEffect(() => {
    onDefenseTypeChange()
  }, [defenseType1, defenseType2])
  useEffect(() => {
    onAttackTypeChange()
  }, [attackType])

  return (
    <div>
      <div className='flex'>
        <div className='w-full border-b border-b-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
          <h1 className='font-bold'>防御模式</h1>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 border-r border-r-muted p-5'>
          <h2 className='text-lg'>选择第一属性</h2>
          <div className='mt-5 flex flex-wrap gap-2'>
            {TYPES.filter((t) => t !== '未知').map((type) => (
              <TypeBadge
                key={type}
                type={type}
                active={defenseType1 === type}
                size='normal'
                onClick={handleDefenseTypeClick1}
              />
            ))}
          </div>
          <h2 className='mt-5 text-lg'>选择第二属性</h2>
          <div className='mt-5 flex flex-wrap gap-2'>
            {TYPES.map((type) => (
              <TypeBadge
                key={type}
                type={type}
                active={defenseType2 === type}
                size='normal'
                onClick={handleDefenseTypeClick2}
              />
            ))}
          </div>
        </div>
        <div className='w-1/2 p-5'>
          {defenseKeys.map((key) => (
            <div key={key}>
              <h2 className='mb-3 text-lg'>受到 {key}x 伤害</h2>
              <div className='mb-3 flex flex-wrap gap-2'>
                {defenseMap[key]?.map((v, i) => (
                  <TypeBadge key={i} type={v} active={true} size='normal' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex'>
        <div className='w-full border-b border-t border-b-muted border-t-muted px-4 pb-2 pt-4 font-semibold tracking-tight text-neutral-700 dark:text-neutral-300'>
          <h1 className='font-bold'>进攻模式</h1>
        </div>
      </div>
      <div className='flex'>
        <div className='w-1/2 border-r border-r-muted p-5'>
          <h2 className='text-lg'>选择属性</h2>
          <div className='mt-5 flex flex-wrap gap-2'>
            {TYPES.filter((t) => t !== '未知').map((type) => (
              <TypeBadge
                key={type}
                type={type}
                active={attackType === type}
                size='normal'
                onClick={handleAttackTypeClick}
              />
            ))}
          </div>
        </div>
        <div className='w-1/2 p-5'>
          {attackKeys.map((key) => (
            <div key={key}>
              <h2 className='mb-3 text-lg'>产生 {key}x 伤害</h2>
              <div className='mb-3 flex flex-wrap gap-2'>
                {attackMap[key]?.map((v, i) => (
                  <TypeBadge key={i} type={v} active={true} size='normal' />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
