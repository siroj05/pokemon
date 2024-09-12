'use client'

import { Input } from "./ui/input"

export default function SearchPokemon () {
  return(
    <div className="relative w-full max-w-2xl my-10">
      <Input className="bg-white w-full" type="email" placeholder="text" />
    </div>
  )
}