import { number, z } from 'zod'

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

export type SpeciesSimple = z.infer<typeof speciesSimpleSchema>
export type SpeciesList = z.infer<typeof speciesListSchema>

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

export const pokemonFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  name_local: z.null(),
  name_en: z.null(),
  form_name: z.string(),
  form_name_local: z.null(),
  form_name_en: z.null(),
  form_order: z.number(),
  is_default: z.number(),
  is_battle_only: z.number(),
  is_mega: z.number(),
  pokemon: z.string(),
  types: z.array(z.string()),
  version_group: z.string(),
  sprites: z.object({
    back_default: z.string(),
    back_female: z.null(),
    back_shiny: z.string(),
    back_shiny_female: z.null(),
    front_default: z.string(),
    front_female: z.string().nullable(),
    front_shiny: z.string(),
    front_shiny_female: z.null(),
    front_home: z.string(),
    front_home_female: z.null(),
    front_home_shiny: z.string(),
    front_home_shiny_female: z.null()
  })
})

export const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  weight: z.number(),
  species: z.string(),
  is_default: z.boolean(),
  abilities: z.array(
    z.object({ name: z.string(), is_hidden: z.boolean(), slot: z.number() })
  ),
  types: z.array(z.string()),
  forms: z.array(pokemonFormSchema),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      name: z.string()
    })
  ),
  game_indices: z.array(z.string()),
  held_items: z.array(z.string()),
  cries: z.object({ latest: z.string(), legacy: z.string() }),
  sprites: z.object({
    back_default: z.string().nullable(),
    back_female: z.string().nullable(),
    back_shiny: z.string().nullable(),
    back_shiny_female: z.string().nullable(),
    front_default: z.string().nullable(),
    front_female: z.string().nullable(),
    front_shiny: z.string().nullable(),
    front_shiny_female: z.string().nullable(),
    other: z.object({
      dream_world: z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable()
      }),
      home: z.object({
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      }),
      'official-artwork': z.object({
        front_default: z.string().nullable(),
        front_shiny: z.string().nullable()
      }),
      showdown: z.object({
        back_default: z.string().nullable(),
        back_female: z.string().nullable(),
        back_shiny: z.string().nullable(),
        back_shiny_female: z.string().nullable(),
        front_default: z.string().nullable(),
        front_female: z.string().nullable(),
        front_shiny: z.string().nullable(),
        front_shiny_female: z.string().nullable()
      })
    }),
    versions: z.object({
      'generation-i': z.object({
        'red-blue': z
          .object({
            back_default: z.string().nullable(),
            back_gray: z.string().nullable(),
            back_transparent: z.string().nullable(),
            front_default: z.string().nullable(),
            front_gray: z.string().nullable(),
            front_transparent: z.string().nullable()
          })
          .nullable(),
        yellow: z.object({
          back_default: z.string().nullable(),
          back_gray: z.string().nullable(),
          back_transparent: z.string().nullable(),
          front_default: z.string().nullable(),
          front_gray: z.string().nullable(),
          front_transparent: z.string().nullable()
        })
      }),
      'generation-ii': z.object({
        crystal: z.object({
          back_default: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_transparent: z.string().nullable(),
          back_transparent: z.string().nullable(),
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_transparent: z.string().nullable(),
          front_transparent: z.string().nullable()
        }),
        gold: z.object({
          back_default: z.string().nullable(),
          back_shiny: z.string().nullable(),
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_transparent: z.string().nullable()
        }),
        silver: z.object({
          back_default: z.string().nullable(),
          back_shiny: z.string().nullable(),
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_transparent: z.string().nullable()
        })
      }),
      'generation-iii': z.object({
        emerald: z.object({
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable()
        }),
        'firered-leafgreen': z.object({
          back_default: z.string().nullable(),
          back_shiny: z.string().nullable(),
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable()
        }),
        'ruby-sapphire': z.object({
          back_default: z.string().nullable(),
          back_shiny: z.string().nullable(),
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable()
        })
      }),
      'generation-iv': z.object({
        'diamond-pearl': z.object({
          back_default: z.string().nullable(),
          back_female: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_female: z.string().nullable(),
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        }),
        'heartgold-soulsilver': z.object({
          back_default: z.string().nullable(),
          back_female: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_female: z.string().nullable(),
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        }),
        platinum: z.object({
          back_default: z.string().nullable(),
          back_female: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_female: z.string().nullable(),
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        })
      }),
      'generation-v': z.object({
        'black-white': z.object({
          animated: z.object({
            back_default: z.string().nullable(),
            back_female: z.string().nullable(),
            back_shiny: z.string().nullable(),
            back_shiny_female: z.string().nullable(),
            front_default: z.string().nullable(),
            front_female: z.string().nullable(),
            front_shiny: z.string().nullable(),
            front_shiny_female: z.string().nullable()
          }),
          back_default: z.string().nullable(),
          back_female: z.string().nullable(),
          back_shiny: z.string().nullable(),
          back_shiny_female: z.string().nullable(),
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        })
      }),
      'generation-vi': z.object({
        'omegaruby-alphasapphire': z.object({
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        }),
        'x-y': z.object({
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        })
      }),
      'generation-vii': z.object({
        icons: z.object({
          front_default: z.string().nullable(),
          front_female: z.string().nullable()
        }),
        'ultra-sun-ultra-moon': z.object({
          front_default: z.string().nullable(),
          front_female: z.string().nullable(),
          front_shiny: z.string().nullable(),
          front_shiny_female: z.string().nullable()
        })
      }),
      'generation-viii': z.object({
        icons: z.object({
          front_default: z.string().nullable(),
          front_female: z.string().nullable()
        })
      })
    })
  }),
  moves: z.array(
    z.object({
      name: z.string(),
      version_details: z.array(
        z.object({
          level_learned_at: z.number(),
          move_learn_method: z.string(),
          version_group: z.string()
        })
      )
    })
  )
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
