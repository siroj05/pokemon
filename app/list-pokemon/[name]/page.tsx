"use client";
import detailPokemon from "@/lib/pokemon-api";
import { convertGramToKilogram, formatFirstLetter, formatString, formattedText } from "@/lib/utils";
import BadgeType from "@/components/badge-type";
import { Title } from "@/components/title";
import Stats from "@/components/stats";
import { Badge } from "@/components/ui/badge";
import PokemonCard from "@/components/card";
import useSWR from "swr";
import Image from 'next/image';
import BackToList from "@/components/back-to-list";
export default function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  // const detail = await detailPokemon(params.name);
  const { data, isLoading, error } = useSWR(["detailPokemon", params.name], () =>
    detailPokemon(params.name)
  );
  if(error){
    return <div className="flex justify-center">
      <div className="font-bold text-center text-red-500">
          An error occurred while fetching the data
          <BackToList/>
        </div>
    </div>
  }
  if(isLoading){
    return <div className="flex items-center justify-center mt-10">
          <Image className="animate-spin" src='/loading.png' alt="" width={90} height={90}/>
        </div>
    
  }
  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-1 sm:flex">
        <img
          src={`${data?.sprites?.other?.["official-artwork"]?.front_default}`}
          alt=""
        />
        <div className="flex flex-col gap-4">
          <Title>{formatFirstLetter(data?.species?.name)}</Title>
          <div className="flex gap-3">
            {data?.types.map((type, i) => (
              <BadgeType key={i} types={type} />
            ))}
          </div>
          <div className="md:flex md:gap-1">
            <p className="my-auto font-semibold max-sm:text-sm">Abilities :</p>
            {data?.abilities.map((item, i) => (
              <Badge
                variant={"outline"}
                key={i}
                className="bg-slate-100 md:p-2 text-black text-[13px]"
              >
                {formatString(formatFirstLetter(item.ability.name))}
              </Badge>
            ))}
          </div>
          {data?.stats.map((list, i) => (
            <Stats key={i} stat={list} />
          ))}
        </div>
      </div>
      <div className="my-10 flex flex-col gap-5">
        <Title>{data?.genera?.genus}</Title>
        <p>{formattedText(data?.flavorTextEntries?.flavor_text ?? "")}</p>
        <div className="md:flex md:justify-between md:mx-20 md:text-xl">
          <div>
            <p>
              <span className="font-semibold">Height : </span>
              {data?.height}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Weight : </span>
              {convertGramToKilogram(data?.weight)}
            </p>
          </div>
        </div>
        <Title>Evolution Chain</Title>
        <div className="flex max-sm:justify-center gap-2 md:justify-between">
          {data?.evolution.map((item) => (
            <PokemonCard key={item} item={item} color={data.color.color.name}/>
          ))}
        </div>
      </div>
    </>
  );
}
