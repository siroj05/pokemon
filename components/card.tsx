'use client'

import { results } from "@/lib/types"
import Link from "next/link"

type Props = {
  item : results
}

const colorMap: { [key: string]: string } = {
  red: "bg-red-300",
  blue: "bg-blue-300",
  green: "bg-green-300",
  yellow: "bg-yellow-300",
  black: "bg-gray-800",
  white: "bg-white",
  purple: "bg-purple-300",
  brown: "bg-amber-300",
  pink: "bg-pink-300"
}

export default function PokemonCard ({item}:Props) {
  let colorClass = colorMap[item.colors] || "bg-gray-200"

  return(
    <Link href={`/list-pokemon/${item.name}`}>
     <div
        key={item.name}
        className={`w-[200px] shadow-xl p-3 ${colorClass} rounded-md transform transition-transform duration-300 hover:scale-105`}
      >
        <img src={item.image} alt={item.name} className="w-full h-30" />
        <div className="font-bold text-center">
          {item.name}
        </div>
      </div>
    </Link>
  )
}