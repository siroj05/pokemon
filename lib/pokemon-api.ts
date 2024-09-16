"use server"

import { detailPokemonType, pokemonListType, genus, flavorTextEntries } from "./types"
import { getAllSpecies } from "./utils"
const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList (page : number, pageSize : number, query: string | null = null){

  let url = `${POKEMON_API_URL}/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  let pokemonData
  let res
  if (query) {
    url = `${POKEMON_API_URL}/pokemon/${query.toLowerCase()}`
    res = await fetch(url)
    const data = await res.json()
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
    const getColor = await fetch(`${POKEMON_API_URL}/pokemon-species/${data.id}/`)
    const color = await getColor.json()
    const colors = color.color.name
    const result : pokemonListType  =  {
      count: 0,
      next: "",
      previous: null,
      results: [
        {
          name : data.name,
          url : '',
          image : image,
          id : data.id,
          colors : colors
        }
      ]
    }
    return result
  }
  else{
    res = await fetch(url)
    const data : pokemonListType = await res.json()
  
    let pokemon = data.results
  
    const detailedPokemon = await Promise.all(
      pokemon.map(async(item) => {
        const path = new URL(item.url).pathname.split("/")
        const id = parseInt(path[path.length - 2])
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
        const getColor = await fetch(`${POKEMON_API_URL}/pokemon-species/${id}/`)
        const color = await getColor.json()
        const colors = color.color.name
        return {...item, image, id, colors}
      })
    ) 
  
    pokemonData = {...data, results: detailedPokemon}
    
    return pokemonData
  }

}

export default async function detailPokemon (name : string) {
  const res = await fetch(`${POKEMON_API_URL}/pokemon/${name}`)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }
  const getSpecies = await fetch(`${POKEMON_API_URL}/pokemon-species/${name}`)
  if (!getSpecies.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }
  const species : detailPokemonType = await getSpecies.json()
  const getChain = await fetch(`${species.evolution_chain.url}`)
  const evolutionChain = await getChain.json()
  const chain = getAllSpecies(evolutionChain?.chain)
  const evolutionImg = await Promise.all(
    chain.map(async(item) =>{
      const path = new URL(item?.url).pathname.split("/")
      const id = parseInt(path[path.length - 2])
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      return {...item, image}
    })
  )

  const data : detailPokemonType = await res.json()
  const genera = species?.genera.find((item:genus) => item.language.name == "en")
  const flavorTextEntries = species?.flavor_text_entries.find((item:flavorTextEntries) => item.language.name == "en" && item.version.name == 'red')

  const detailPokemonData = {...data, genera:genera, flavorTextEntries : flavorTextEntries, evolution : evolutionImg, color:species}
  
  return detailPokemonData
}