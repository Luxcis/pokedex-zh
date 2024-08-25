import exp from 'constants'
import { z } from 'zod'

export const PaginatedResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  result: z.array(z.any())
})

export const speciesSimpleSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable(),
  sprite_home: z.string().url().nullable()
})

export const speciesListSchema = z.array(speciesSimpleSchema)

export const speciesDetailSchema = z.object({})

export type SpeciesSimple = z.infer<typeof speciesSimpleSchema>
export type SpeciesList = z.infer<typeof speciesListSchema>
export type SpeciesDetail = z.infer<typeof speciesDetailSchema>

export const itemSimpleSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable(),
  category: z.string().nullable()
})

export const itemListSchema = z.array(itemSimpleSchema)

export const itemDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable(),
  cost: z.number().nullable(),
  category: z.string().nullable()
})

export type ItemSimple = z.infer<typeof itemSimpleSchema>
export type ItemList = z.infer<typeof itemListSchema>
export type ItemDetail = z.infer<typeof itemDetailSchema>

export const abilitySimpleSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable()
})

export const abilityListSchema = z.array(abilitySimpleSchema)
export const abilityDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable()
})

export type AbilitySimple = z.infer<typeof abilitySimpleSchema>
export type AbilityList = z.infer<typeof abilityListSchema>
export type AbilityDetail = z.infer<typeof abilityDetailSchema>

export const moveSimpleSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable()
})
export const moveListSchema = z.array(moveSimpleSchema)
export const moveDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable()
})

export type MoveSimple = z.infer<typeof moveSimpleSchema>
export type MoveList = z.infer<typeof moveListSchema>
export type MoveDetail = z.infer<typeof moveDetailSchema>

export const pokemonSimpleSchema = z.object({
  id: z.number(),
  name: z.string(),
  types: z.array(z.string()).nullable()
})

export const pokemonListSchema = z.array(pokemonSimpleSchema)

export const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable(),
  types: z.array(z.string())
})

export type PokemonSimple = z.infer<typeof pokemonSimpleSchema>
export type PokemonList = z.infer<typeof pokemonListSchema>
export type PokemonDetail = z.infer<typeof pokemonDetailSchema>

export type PaginatedResponse<T> = z.infer<typeof PaginatedResponseSchema> & {
  result: T[]
}
