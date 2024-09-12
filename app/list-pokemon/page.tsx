'use server'
import { getPokemonList } from "@/lib/pokemon-api";
import PokemonCard from "@/components/card";
import SearchPokemon from "@/components/search";

export default async function ListPokemon() {

  const pokemonData = await getPokemonList()

  return (
    <div className="my-2">
      <div className="sticky top-0 z-50 flex items-center justify-center ">
        <SearchPokemon/>
      </div>
      <div className="flex items-center justify-center my-5">
        <div className="grid grid-cols-4 gap-4">
          {
            pokemonData.results.map((item, i) => (
              <div key={i}>
                <PokemonCard 
                  item={item}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
