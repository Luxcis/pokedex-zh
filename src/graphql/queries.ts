import { gql } from '@apollo/client'

export const GET_POKEMONS = gql`
  query PokemonsQuery($langId: Int = 12, $limit: Int = 10, $offset: Int = 0) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      name
      id
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesnames(
          where: { language_id: { _eq: $langId } }
        ) {
          id
          name
        }
      }
      pokemon_v2_pokemontypes {
        type_id
        pokemon_v2_type {
          name
          pokemon_v2_typenames(where: { language_id: { _eq: $langId } }) {
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
