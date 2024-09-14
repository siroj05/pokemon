"use server";
import detailPokemon from "@/lib/pokemon-api";
import { formatFirstLetter, formatString } from "@/lib/utils";
import BadgeType from "@/components/badge-type";
import { Title } from "@/components/title";
import Stats from "@/components/stats";
import { Badge } from "@/components/ui/badge";
export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const detail = await detailPokemon(params.name);

  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-3">
          <img
            src={`${detail?.sprites?.other?.["official-artwork"]?.front_default}`}
            alt=""
          />
          <div className="flex flex-col gap-4">
            <Title>{formatFirstLetter(detail?.species?.name)}</Title>
            <div className="flex gap-3">
              {detail.types.map((type, i) => (
                <BadgeType key={i} types={type} />
              ))}
            </div>
              <div className="flex gap-1">
                <p className="my-auto font-semibold">
                  Abilities :  
                </p>
                {detail?.abilities.map((item, i) => (
                  <Badge variant={'outline'} key={i} className="bg-slate-100 p-2 text-black">
                    {formatString(formatFirstLetter(item.ability.name))}
                  </Badge>
                ))}
              </div>
            {detail?.stats.map((list, i) => (
              <Stats key={i} stat={list} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
