'use client'
import PokemonCard from "@/components/card";
import { results } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Pokedex () {
  const [pokedex, setPokedex] = useState<results[]>()
  useEffect(() => {
    const savedPokedex = localStorage.getItem("pokedex");
    if (savedPokedex) {
      setPokedex(JSON.parse(savedPokedex));
    }
  }, [])

  return (
    <div className="flex justify-center my-5">
      <div className="grid grid-cols-4 gap-5">
        {
          pokedex?.map((item,i) => (
            <PokemonCard
            key={i}
              item={item}
            />
          ))
        }
      </div>
    </div>
  )
}