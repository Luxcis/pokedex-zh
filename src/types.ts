import { group } from 'console'
import { machine } from 'os'
import { z } from 'zod'

export const typeSchema = z.enum([
  '一般',
  '格斗',
  '飞行',
  '毒',
  '地面',
  '岩石',
  '虫',
  '幽灵',
  '钢',
  '火',
  '水',
  '草',
  '电',
  '超能力',
  '冰',
  '龙',
  '恶',
  '妖精',
  '未知'
])

export type Type = z.infer<typeof typeSchema>

export const PaginatedResponseSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  contents: z.array(z.any())
})

export const pokemonSimpleSchema = z.object({
  index: z.number(),
  name: z.string(),
  name_jp: z.string(),
  name_en: z.string(),
  generation: z.string(),
  types: z.array(typeSchema),
  meta: z.object({
    icon_position: z.string()
  })
})

export const pokemonListSchema = z.array(pokemonSimpleSchema)

export const statLabelSchema = z.enum([
  'hp',
  'attack',
  'defense',
  'sp_attack',
  'sp_defense'
])

export type StatLabel = z.infer<typeof statLabelSchema>

export const statSchema = z.object({
  form: z.string().default('一般'),
  data: z.record(statLabelSchema, z.string())
})

export type Stat = z.infer<typeof statSchema>

export const homeImageSchema = z.object({
  name: z.string(),
  image: z.string().nullable(),
  shiny: z.string().nullable()
})

export type HomeImage = z.infer<typeof homeImageSchema>

export const pokemonDetailSchema = z.object({
  name: z.string(),
  profile: z.string(),
  forms: z.array(
    z.object({
      name: z.string(),
      index: z.string(),
      is_mega: z.boolean(),
      is_gmax: z.boolean(),
      image: z.string(),
      types: z.array(typeSchema),
      genus: z.string(),
      ability: z.array(
        z.object({
          name: z.string(),
          is_hidden: z.boolean()
        })
      ),
      experience: z.object({
        number: z.string(),
        speed: z.string()
      }),
      height: z.string(),
      weight: z.string(),
      gender_rate: z
        .object({
          male: z.string(),
          female: z.string()
        })
        .nullable(),
      shape: z.string(),
      color: z.string(),
      catch_rate: z.object({
        number: z.string(),
        rate: z.string()
      }),
      egg_groups: z.array(z.string())
    })
  ),
  stats: z.array(statSchema),
  flavor_texts: z.array(
    z.object({
      name: z.string(),
      versions: z.array(
        z.object({
          name: z.string(),
          group: z.string(),
          text: z.string()
        })
      )
    })
  ),
  names: z.object({
    zh_hans: z.string(),
    zh_hant: z.string(),
    en: z.string(),
    fr: z.string(),
    de: z.string(),
    it: z.string(),
    es: z.string(),
    ja: z.string(),
    ko: z.string()
  }),
  moves: z.object({
    learnd: z.array(
      z.object({
        form: z.string(),
        data: z.array(
          z.object({
            level_learned_at: z.string().nullable(),
            machine_used: z.string().nullable(),
            method: z.string(),
            name: z.string(),
            flavor_text: z.string(),
            type: z.string(),
            category: z.string(),
            power: z.string(),
            accuracy: z.string(),
            pp: z.string()
          })
        )
      })
    ),
    machine: z.array(
      z.object({
        form: z.string(),
        data: z.array(
          z.object({
            level_learned_at: z.string().nullable(),
            machine_used: z.string().nullable(),
            method: z.string(),
            name: z.string(),
            flavor_text: z.string(),
            type: z.string(),
            category: z.string(),
            power: z.string(),
            accuracy: z.string(),
            pp: z.string()
          })
        )
      })
    )
  }),
  home_images: z.array(homeImageSchema)
})

export type PokemonSimple = z.infer<typeof pokemonSimpleSchema>
export type PokemonList = z.infer<typeof pokemonListSchema>
export type PokemonDetail = z.infer<typeof pokemonDetailSchema>
export const flavorTextSchema = z.object({
  flavor_text: z.string(),
  version: z.string()
})

export const speciesDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.string().nullable(),
  name_en: z.string().nullable(),
  name_jp: z.string().nullable(),
  genus_local: z.string().nullable(),
  genus_en: z.string().nullable(),
  color: z.string().nullable(),
  shape: z.string().nullable(),
  forms_switchable: z.boolean().nullable(),
  generation: z.string().nullable(),
  growth_rate: z.string(),
  habitat: z.string(),
  has_gender_differences: z.boolean(),
  hatch_counter: z.number(),
  is_baby: z.boolean(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  base_happiness: z.number(),
  capture_rate: z.number(),
  gender_rate: z.number(),
  sprite_default: z.string(),
  sprite_home: z.string(),
  egg_groups: z.array(z.string()),
  flavor_texts_local: z.array(flavorTextSchema),
  flavor_texts_en: z.array(flavorTextSchema),
  pal_park_encounters: z.array(z.unknown()),
  pokedex_numbers: z.array(
    z.object({ pokedex: z.string(), entry_number: z.number() })
  ),
  varieties: z.array(pokemonDetailSchema),
  evolution_chain_id: z.number()
})

export type SpeciesDetail = z.infer<typeof speciesDetailSchema>

export type PaginatedResponse<T> = z.infer<typeof PaginatedResponseSchema> & {
  result: T[]
}
