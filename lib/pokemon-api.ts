"use server"

import { pokemonListType } from "./types"

const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList (){
  const res = await fetch(`${POKEMON_API_URL}/pokemon?limit=20&offset=0`)
  const data : pokemonListType = await res.json()
  const pokemon = await Promise.all(
    data.results.map(async(item, index) =>{
      const path= new URL(item.url).pathname.split("/") 
      const id = parseInt(path[path.length - 2])
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      const getColor = await fetch(`${POKEMON_API_URL}/pokemon-species/${id}/`)
      const color = await getColor.json()
      const colors = color.color.name
      return {...item, image, id, colors}
    })
  ) 

  const pokemonData = {...data, results: pokemon}

  return pokemonData
}