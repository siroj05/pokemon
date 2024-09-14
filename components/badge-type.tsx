'use client'
import { typesPokemon } from "@/lib/types";
import { formatFirstLetter, typeColor } from "@/lib/utils";

interface Props {
  types: typesPokemon;
}

export default function BadgeType ({ types }: Props) {
  return (
    <div
      className={`${typeColor(types.type.name)} p-1 px-3 rounded-lg shadow-md`}
    >
      {formatFirstLetter(types.type.name)}
    </div>
  );
}
