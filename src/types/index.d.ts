export type TypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow'

export type Type = {
  id: number
  name: TypeName
  color: string
}

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export type Stat = {
  id: number
  name: StatName
  base: number
  effort: number
}

export type Specy = {
  names: {
    id: number
    name: string
  }[]
}

export type TypeResult = {
  type_id: number
  type: {
    name: TypeName
    localNames: { name: string }[]
  }
}

export type PokemonData = {
  name: string
  id: number
  specy: Specy
  types: TypesResult[]
}
