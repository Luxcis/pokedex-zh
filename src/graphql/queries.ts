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
  query MyQuery($id: Int!, $langId: Int = 12) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      name
      pokemon_species_id
      weight
      height
      base_experience
      is_default
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
          pokemon_v2_typenames(where: { language_id: { _eq: $langId } }) {
            name
          }
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(
          where: { language_id: { _eq: $langId } }
        ) {
          name
          genus
        }
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: $langId } }
        ) {
          flavor_text
          version_id
          pokemon_species_id
        }
        pokemon_v2_pokemonspeciesdescriptions(
          where: { language_id: { _eq: $langId } }
        ) {
          description
        }
      }
      pokemon_v2_pokemonstats {
        effort
        base_stat
        stat_id
        pokemon_v2_stat {
          name
          pokemon_v2_statnames(where: { language_id: { _eq: $langId } }) {
            name
          }
        }
      }
    }
    pokemon_v2_pokemonability_by_pk(id: $id) {
      slot
      pokemon_v2_ability {
        name
        pokemon_v2_abilityflavortexts(
          where: { language_id: { _eq: $langId } }
        ) {
          flavor_text
        }
        is_main_series
        pokemon_v2_abilitynames(where: { language_id: { _eq: $langId } }) {
          name
          ability_id
        }
      }
    }
  }
`
