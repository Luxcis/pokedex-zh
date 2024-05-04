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
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: $langId } }
        ) {
          flavor_text
          version_id
        }
      }
    }
  }
`
