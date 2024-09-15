"use client";
import { getPokemonList } from "@/lib/pokemon-api";
import PokemonCard from "@/components/card";
import useSWR from "swr";
import PaginationPokemon from "../../components/pagination";
import SearchPokemon from "@/components/search";
import Image from 'next/image';
export default function ListPokemon({
  searchParams
}:{
  searchParams:{
    query?:string,
    page?:string
  }
}) {
  const page = Number(searchParams?.page || 1);
  const query = searchParams?.query || ""

  const pageSize = 20;
  const { data, isLoading, error } = useSWR(["getPokemonList", page, pageSize, query], () =>
    getPokemonList(page, pageSize, query)
  );

  return (
    <>
      <div className="sticky top-10 z-50 flex justify-center ">
        <SearchPokemon />
      </div>
      {error || data?.results.length == 0 ? (
        <div className="font-bold text-center">Not Found</div>
      ) : isLoading ? (
        <div className="flex items-center justify-center mt-10">
          <Image className="animate-spin" src='/loading.png' alt="" width={90} height={90}/>
        </div>
      ) : (
        <>
          <div className="flex justify-center my-5">
            <div className="grid grid-cols-4 md:gap-5 lg:grid-cols-5 lg:gap-10 max-sm:gap-2">
              {data?.results.map((item, i) => (
                <div key={i}>
                  <PokemonCard item={item} />
                </div>
              ))}
            </div>
          </div>
          <PaginationPokemon
            count={data!.count}
            pageSize={pageSize}
          />
        </>
      )}
    </>
  );
}
