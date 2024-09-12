'use client'

import { results } from "@/lib/types"

type Props = {
  item : results
}

export default function PokemonCard ({item}:Props) {
  console.log(item)
  return(
    <div key={item.name} className="w-[200px] p-3 border bg-blue-300 rounded-md">
      <img src={item.image} alt={item.name} className="w-full h-30"/>
      <div className="font-bold text-center">
        {item.name}
      </div>
    </div>
  )
}