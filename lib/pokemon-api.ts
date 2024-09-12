"use server"

import { pokemonListType } from "./types"

const POKEMON_API_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList (){
  const res = await fetch(`${POKEMON_API_URL}/pokemon?limit=20&offset=0`)
  const data : pokemonListType = await res.json()
  const pokemon = data.results.map((item, index) =>{
    const path= new URL(item.url).pathname.split("/") 
    const id = parseInt(path[path.length - 2])
    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    
    return {...item, image, id}
  })
  const pokemonData = {...data, results: pokemon}

  return pokemonData
}