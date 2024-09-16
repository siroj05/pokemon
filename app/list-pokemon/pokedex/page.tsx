"use client";
import PokemonCard from "@/components/card";
import { useEffect } from "react";
import { useStatePokedex } from "./store";
import BackToList from "@/components/back-to-list";

export default function Pokedex() {
  const { pokedex, setPokedex } = useStatePokedex((state) => state);
  useEffect(() => {
    const savedPokedex = localStorage.getItem("pokedex");
    if (savedPokedex) {
      setPokedex(JSON.parse(savedPokedex));
    }
  }, []);

  return (
    <div className="flex justify-center my-5">
      {pokedex.length > 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {pokedex?.map((item, i) => (
            <PokemonCard key={i} item={item} />
          ))}
        </div>
      ) : (
        <div>
          <p className="font-bold text-center">Not Found</p>
          <BackToList />
        </div>
      )}
    </div>
  );
}
