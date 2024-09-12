export type pokemonListType =  {
  count : number,
  next : string,
  previous : string | null
  results : results[]
}

export type results = {
  name : string
  url : string
  image : string
  id : number
}