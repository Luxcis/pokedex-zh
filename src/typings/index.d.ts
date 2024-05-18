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

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export type Specy = {
  names: {
    id: number
    name: string
  }[]
}

export type Type = {
  type_id: number
  type: {
    name: TypeName
    local_names: { name: string }[]
  }
}

export type PokemonData = {
  name: string
  id: number
  specy: Specy
  types: Type[]
}

export type FlavorText = {
  text: string
  version: {
    name: string
    local_names: { name: string }[]
  }
}

export type Stat =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed'

export type Sprites = {
  collection: {
    other: {
      home: {
        front_shiny: string | null
        front_female: string | null
        front_default: string | null
        front_shiny_female: string | null
      }
      showdown: {
        back_shiny: string | null
        back_female: string | null
        front_shiny: string | null
        back_default: string | null
        front_female: string | null
        front_default: string | null
        back_shiny_female: string | null
        front_shiny_female: string | null
      }
      dream_world: {
        front_female: string | null
        front_default: string | null
      }
      'official-artwork': {
        front_shiny: string | null
        front_default: string | null
      }
    }
    versions: {
      'generation-i': {
        yellow: {
          back_gray: string
          front_gray: string
          back_default: string
          front_default: string
          back_transparent: string
          front_transparent: string
        }
      }
      'red-blue': {
        back_gray: string
        front_gray: string
        back_default: string
        front_default: string
        back_transparent: string
        front_transparent: string
      }
    }
    back_shiny: string | null
    back_female: string | null
    front_shiny: string | null
    back_default: string | null
    front_female: string | null
    front_default: string | null
    back_shiny_female: string | null
    front_shiny_female: string | null
  }
}

export type EvolutionChain = {
  species: { names: { name: string; id: number }[]; from_id: number | null }[]
}

export type PokemonDetailData = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  is_battle_only: boolean
  types: Type[]
  stats: {
    base: number
    effort: number
    name: string
    stat: {
      names: { name: string; id: number }[]
    }
  }[]
  specy: {
    names: { name: string; genus: string }[]
    texts: FlavorText[]
    capture_rate: number
    evolution_chain: EvolutionChain
  }
}
