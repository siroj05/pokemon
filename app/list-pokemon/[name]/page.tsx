"use server";
import detailPokemon from "@/lib/pokemon-api";
import { formatFirstLetter, formatString, formattedText } from "@/lib/utils";
import BadgeType from "@/components/badge-type";
import { Title } from "@/components/title";
import Stats from "@/components/stats";
import { Badge } from "@/components/ui/badge";
import PokemonCard from "@/components/card";
export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const detail = await detailPokemon(params.name);

  return (
    <>
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
            <p className="my-auto font-semibold">Abilities :</p>
            {detail?.abilities.map((item, i) => (
              <Badge
                variant={"outline"}
                key={i}
                className="bg-slate-100 p-2 text-black"
              >
                {formatString(formatFirstLetter(item.ability.name))}
              </Badge>
            ))}
          </div>
          {detail?.stats.map((list, i) => (
            <Stats key={i} stat={list} />
          ))}
        </div>
      </div>
      <div className="my-10 flex flex-col gap-5">
        <Title>{detail?.genera?.genus}</Title>
        <p>{formattedText(detail?.flavorTextEntries?.flavor_text ?? "")}</p>
        <div className="flex justify-between mx-20 text-xl">
          <div>
            <p>
              <span className="font-semibold">Height : </span>
              {detail?.height}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Weight : </span>
              {detail?.weight}
            </p>
          </div>
        </div>
        <Title>Evolution Chain</Title>
        <div className="flex justify-center gap-10">
          {detail.evolution.map((item) => (
            <PokemonCard key={item} item={item} color={detail.color.color.name}/>
          ))}
        </div>
      </div>
    </>
  );
}
