"use client";

import { results } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useStatePokedex } from "@/app/list-pokemon/pokedex/store";
import { usePathname } from "next/navigation";
import { formatFirstLetter } from "@/lib/utils";

type Props = {
  item: results;
  color?: string;
};

const colorMap: { [key: string]: string } = {
  red: "bg-red-300",
  blue: "bg-blue-300",
  green: "bg-green-300",
  yellow: "bg-yellow-300",
  black: "bg-gray-800",
  white: "bg-white",
  purple: "bg-purple-300",
  brown: "bg-amber-300",
  pink: "bg-pink-300",
};

export default function PokemonCard({ item, color }: Props) {
  const { setPokedex } = useStatePokedex((state) => state);
  const path = usePathname();
  
  useEffect(() => {
    const savedPokedex = localStorage.getItem("pokedex");
    if (savedPokedex) {
      setPokedex(JSON.parse(savedPokedex));
    }
  }, []);

  const handleClick = (newPokemon: results) => {
    const savedPokedex = localStorage.getItem("pokedex");
    const currentPokedex: results[] = savedPokedex
      ? JSON.parse(savedPokedex)
      : [];
    const isAlreadyInPokedex = currentPokedex.some(
      (pokemon) => pokemon.name === newPokemon.name
    );
    if (!isAlreadyInPokedex) {
      const updatedPokedex = [...currentPokedex, newPokemon];
      setPokedex(updatedPokedex);
      localStorage.setItem("pokedex", JSON.stringify(updatedPokedex));
    } else {
      console.log("Pokémon is already in the Pokedex.");
    }
  };

  const colorClass =
    colorMap[item.colors] || (color && colorMap[color]) || "bg-gray-200";

  const handleDrop = (item:any) => {
    const savedPokedex = localStorage.getItem("pokedex");
    let currentPokedex: results[] = savedPokedex
      ? JSON.parse(savedPokedex)
      : [];
    const updatedPokedex = currentPokedex.filter(
      (pokemon) => pokemon.name !== item.name
    );
    setPokedex(updatedPokedex);
    localStorage.setItem("pokedex", JSON.stringify(updatedPokedex));
  }

  return (
    <div className="relative transform transition-transform duration-300 hover:scale-105">
      <div className={` md:w-[150px] max-sm:w-[75px] shadow-xl p-3 ${colorClass} rounded-md`}>
        <Link href={`/list-pokemon/${item.name}`}>
          <img src={item.image} alt={item.name} className="w-full h-30" />
        </Link>
        <div className="flex justify-center">
          <div className="font-bold md:text-center max-sm:text-[12px]">{formatFirstLetter(item.name)}</div>
        </div>
        <div className="flex justify-center">
          {path === "/list-pokemon/pokedex" ? (
            <button
              onClick={() => handleDrop(item)}
              className="hover:bg-blue-300 flex gap-2 bg-progress text-white rounded-sm px-5 max-sm:px-4 border-2 border-white"
            >
              <span className="max-sm:text-[10px]">Drop</span>
              <Image
                className="hover:animate-spin my-auto"
                src="/loading.png"
                alt=""
                width={14}
                height={14}
              />
            </button>
          ) : (
            <button
              onClick={() => handleClick(item)}
              className="hover:bg-blue-300 flex gap-2 bg-progress text-white rounded-sm px-5 max-sm:px-4 border-2 border-white"
            >
              <span className="max-sm:text-[10px]">Add</span>
              <Image
                className="hover:animate-spin my-auto"
                src="/loading.png"
                alt=""
                width={14}
                height={14}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
