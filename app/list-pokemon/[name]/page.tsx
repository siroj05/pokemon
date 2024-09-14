import detailPokemon from "@/lib/pokemon-api"
import { Progress } from "@/components/ui/progress"
import { formatFirstLetter, formatString } from "@/lib/utils"
export default async function PokemonDetail (
  { params } : { params: {name : string} }
) {

  const detail = await detailPokemon(params.name)

  return(
    <>
      <div className="">
        <div className="grid grid-cols-2 gap-3">
          <img src={`${detail?.sprites?.other?.['official-artwork']?.front_default}`} alt="" />
            <div className="flex flex-col gap-4">
              <h1 className="font-bold text-3xl">{formatFirstLetter(detail?.species?.name)}</h1>
              {
                detail?.stats.map((list, i) => (
                  <div key={i}>
                    <h1 className="font-semibold">{formatString(list.stat.name)}</h1>
                    <div className="relative">
                      <Progress value={list.base_stat} />
                      <span className="text-white absolute top-0 left-2">{list.base_stat}</span>
                    </div>
                  </div>   
                ))
              }
            </div>
        </div>
      </div>
    </>
  )
}