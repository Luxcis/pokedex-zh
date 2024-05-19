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
  texts: FlavorText[]
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

// sprites

export interface Sprites {
  other: Other
  versions: Versions
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Other {
  home: Home
  showdown: Showdown
  dream_world: DreamWorld
  'official-artwork': OfficialArtwork
}

export interface Home {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface Showdown {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface DreamWorld {
  front_female: any
  front_default: string
}

export interface OfficialArtwork {
  front_shiny: string
  front_default: string
}

export interface Versions {
  'generation-i': GenerationI
  'generation-v': GenerationV
  'generation-ii': GenerationIi
  'generation-iv': GenerationIv
  'generation-vi': GenerationVi
  'generation-iii': GenerationIii
  'generation-vii': GenerationVii
  'generation-viii': GenerationViii
}

export interface GenerationI {
  yellow: Yellow
  'red-blue': RedBlue
}

export interface Yellow {
  back_gray: any
  front_gray: any
  back_default: any
  front_default: any
  back_transparent: any
  front_transparent: any
}

export interface RedBlue {
  back_gray: any
  front_gray: any
  back_default: any
  front_default: any
  back_transparent: any
  front_transparent: any
}

export interface GenerationV {
  'black-white': BlackWhite
}

export interface BlackWhite {
  animated: Animated
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface Animated {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface GenerationIi {
  gold: Gold
  silver: Silver
  crystal: Crystal
}

export interface Gold {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  front_transparent: string
}

export interface Silver {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  front_transparent: string
}

export interface Crystal {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

export interface GenerationIv {
  platinum: Platinum
  'diamond-pearl': DiamondPearl
  'heartgold-soulsilver': HeartgoldSoulsilver
}

export interface Platinum {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface DiamondPearl {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface HeartgoldSoulsilver {
  back_shiny: string
  back_female: any
  front_shiny: string
  back_default: string
  front_female: any
  front_default: string
  back_shiny_female: any
  front_shiny_female: any
}

export interface GenerationVi {
  'x-y': XY
  'omegaruby-alphasapphire': OmegarubyAlphasapphire
}

export interface XY {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface OmegarubyAlphasapphire {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface GenerationIii {
  emerald: Emerald
  'ruby-sapphire': RubySapphire
  'firered-leafgreen': FireredLeafgreen
}

export interface Emerald {
  front_shiny: string
  front_default: string
}

export interface RubySapphire {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface FireredLeafgreen {
  back_shiny: any
  front_shiny: any
  back_default: any
  front_default: any
}

export interface GenerationVii {
  icons: Icons
  'ultra-sun-ultra-moon': UltraSunUltraMoon
}

export interface Icons {
  front_female: any
  front_default: string
}

export interface UltraSunUltraMoon {
  front_shiny: string
  front_female: any
  front_default: string
  front_shiny_female: any
}

export interface GenerationViii {
  icons: Icons2
}

export interface Icons2 {
  front_female: any
  front_default: string
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
  sprites: {
    collection: Sprites
  }[]
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
