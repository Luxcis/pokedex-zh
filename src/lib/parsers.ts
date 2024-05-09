import { TYPES } from './constants'

export type Type = {
  id: number
  name: string
  localName: string
  color: string
}

export type Stat = {
  id: number
  name: string
  localName: string
  base: number
  effort: number
}

export const parseTypes = (apiData: any) => {
  const types: Type[] = apiData.map((type: any) => ({
    id: type.type_id,
    name: type.pokemon_v2_type.name,
    localName: type.pokemon_v2_type.pokemon_v2_typenames[0]?.name,
    color: TYPES.find((i) => i.id === type.type_id)?.color || '#ffffff'
  }))
  return types
}

export const parseStats = (apiData: any) => {
  const stats: Stat[] = apiData.map((i: any) => ({
    id: i.stat_id,
    name: i.pokemon_v2_stat.name,
    localName: i.pokemon_v2_stat.pokemon_v2_statnames[0].name,
    base: i.base_stat,
    effort: i.effort
  }))
  return stats
}

export const parseSprites = (apiData: any) => {}

export const parseFlavorTexts = (apiData: any) => {}
