'use client'

import { results } from "@/lib/types"

type Props = {
  item : results
}

const colorMap: { [key: string]: string } = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  black: "bg-gray-800",
  white: "bg-white",
  purple: "bg-purple-500",
  brown: "bg-amber-500",
  pink: "bg-pink-500"
}

export default function PokemonCard ({item}:Props) {
  let colorClass = colorMap[item.colors] || "bg-gray-200"

  return(
    <div key={item.name} className={`w-[200px] shadow-xl p-3 border ${colorClass} rounded-md`}>
      <img src={item.image} alt={item.name} className="w-full h-30"/>
      <div className="font-bold text-center">
        {item.name}
      </div>
    </div>
  )
}