import { results } from "@/lib/types";
import { create } from "zustand";

interface PokedexState {
  setPokedex : (value : results[]) => void
  pokedex : results[]
}

export const useStatePokedex = create<PokedexState>()((set) =>({
  pokedex : [],
  setPokedex:(value : results[]) => {
    set({
      pokedex : value
    })
  }
}))