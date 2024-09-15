"use server"

import { detailPokemonType, pokemonListType, genus, flavorTextEntries } from "./types"
import { getAllSpecies } from "./utils"
const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList (page : number, pageSize : number, query: string | null = null){

  let url = `${POKEMON_API_URL}/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`
  
  if (query) {
    url = `${POKEMON_API_URL}/pokemon?limit=10000`
  }

  const res = await fetch(url)
  const data : pokemonListType = await res.json()

  let pokemon = data.results

  if (query) {
    pokemon = pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()))
  }

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

  let pokemonData = {...data, results: detailedPokemon}

  if(query){
    pokemonData = {
      previous : null,
      count : detailedPokemon.length,
      next : "",
      results : detailedPokemon
    }
  }
  
  return pokemonData
}

export default async function detailPokemon (name : string) {
  const res = await fetch(`${POKEMON_API_URL}/pokemon/${name}`)
  const getSpecies = await fetch(`${POKEMON_API_URL}/pokemon-species/${name}`)
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

  let detailPokemonData = {...data, genera:genera, flavorTextEntries : flavorTextEntries, evolution : evolutionImg, color:species}
  
  return detailPokemonData
}