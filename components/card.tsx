"use client";

import { results } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useStatePokedex } from "@/app/list-pokemon/pokedex/store";

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
  const { setPokedex } = useStatePokedex((state) => state)
  useEffect(() => {
    const savedPokedex = localStorage.getItem("pokedex");
    if (savedPokedex) {
      setPokedex(JSON.parse(savedPokedex));
    }
  }, [])

  const handleClick = (newPokemon: results) => {
    const savedPokedex = localStorage.getItem("pokedex")
    let currentPokedex: results[] = savedPokedex ? JSON.parse(savedPokedex) : [];
    const isAlreadyInPokedex = currentPokedex.some(pokemon => pokemon.name === newPokemon.name)
    if (!isAlreadyInPokedex) {
      const updatedPokedex = [...currentPokedex, newPokemon];
      setPokedex(updatedPokedex)
      localStorage.setItem("pokedex", JSON.stringify(updatedPokedex))
    } else {
      console.log("Pokémon is already in the Pokedex.")
    }
  };

  let colorClass = colorMap[item.colors] || (color && colorMap[color]) || "bg-gray-200";

  return (
    <div className="relative transform transition-transform duration-300 hover:scale-105">
      <div className={`w-[200px] shadow-xl p-3 ${colorClass} rounded-md`}>
        <Link href={`/list-pokemon/${item.name}`}>
          <img src={item.image} alt={item.name} className="w-full h-30" />
          <div className="font-bold text-center">{item.name}</div>
        </Link>
        <div className="flex justify-center">
          <button
            onClick={() => handleClick(item)}
            className="hover:bg-blue-300 flex gap-2 bg-progress text-white rounded-sm px-5 border-2 border-white"
          >
            <span>Add</span>
            <Image
              className="hover:animate-spin my-auto"
              src="/loading.png"
              alt=""
              width={14}
              height={14}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
