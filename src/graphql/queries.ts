import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query PokemonsQuery(
    $lang: String = "zh-Hans"
    $limit: Int = 10
    $offset: Int = 0
    $search: String = ""
    $types: [String!] = ["grass", "poison"]
  ) {
    pokemons: pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: {
        pokemon_v2_pokemonspecy: {
          pokemon_v2_pokemonspeciesnames: {
            pokemon_v2_language: { name: { _eq: $lang } }
            name: { _regex: $search }
          }
        }
        pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _in: $types } } }
      }
      order_by: { id: asc, name: asc }
    ) {
      name
      id
      specy: pokemon_v2_pokemonspecy {
        names: pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { name: { _eq: $lang } } }
        ) {
          id
          name
        }
      }
      types: pokemon_v2_pokemontypes {
        type_id
        type: pokemon_v2_type {
          name
          localNames: pokemon_v2_typenames(
            where: { pokemon_v2_language: { name: { _eq: $lang } } }
          ) {
            name
          }
        }
      }
    }
  }
`

export const GET_POKEMON_INFO = gql`
  query PokemonInfoQuery($id: Int = 3, $lang: String = "zh-Hans") {
    detail: pokemon_v2_pokemon_by_pk(id: $id) {
      height
      weight
      base_experience
      id
      name
      specy: pokemon_v2_pokemonspecy {
        names: pokemon_v2_pokemonspeciesnames(
          where: { pokemon_v2_language: { name: { _eq: $lang } } }
        ) {
          name
          genus
        }
        texts: pokemon_v2_pokemonspeciesflavortexts(
          where: { pokemon_v2_language: { name: { _eq: $lang } } }
        ) {
          text: flavor_text
          version: pokemon_v2_version {
            name
            local_names: pokemon_v2_versionnames(
              where: { pokemon_v2_language: { name: { _eq: $lang } } }
            ) {
              name
            }
          }
        }
        evolution: pokemon_v2_pokemonevolutions {
          evolution_trigger_id
          gender_id
          evolved_species_id
          trigger: pokemon_v2_evolutiontrigger {
            name
          }
          gender: pokemon_v2_gender {
            name
          }
          item: pokemon_v2_item {
            name
          }
          turn_upside_down
          time_of_day
          min_level
          min_beauty
          min_affection
          min_happiness
          held_item_id
          needs_overworld_rain
          location: pokemon_v2_location {
            names: pokemon_v2_locationnames(where: { name: { _eq: $lang } }) {
              name
            }
          }
        }
      }
      stats: pokemon_v2_pokemonstats {
        id
        base: base_stat
        effort
        stat: pokemon_v2_stat {
          names: pokemon_v2_statnames(
            where: { pokemon_v2_language: { name: { _eq: $lang } } }
          ) {
            name
            stat_id
          }
          is_battle_only
          name
        }
      }
    }
  }
`
