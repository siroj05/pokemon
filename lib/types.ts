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
  colors : string
}

export type detailPokemonType = {
  sprites:{
    other:{
      'official-artwork' : {
        front_default : string
        front_shiny : string
      }
    }
  }
  stats : {
    base_stat : number
    stat : {
      name : string
      url : string
    }
  }[]
  types : {
    slot : number
    type : {
      name : string
      url : string
    }
  }[]
  weight : number
  height : number
  species : {
    name : string
    url : string
  }
}