'use client'
import { ReactNode } from "react";
import Image from 'next/image';
import Link from "next/link";
import { useStatePokedex } from "./pokedex/store";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { pokedex } = useStatePokedex((state) => state)
  return (
    <>
      <div className="md:text-7xl max-sm:text-xl bg-header text-yellow-400 text-center border-b-8 border-yellow-400 p-5 font-bold">
        <div className="flex justify-between gap-3 mx-10">
          <Link className='flex' href={'/'}>
            <Image 
              className="sm:w-5 sm:h-5 md:w-16 md:h-16 lg:w-20 lg:h-20" 
              src='/pokemon-go.png' 
              alt="Pokemon Logo" 
              width={50} 
              height={50} 
              layout="intrinsic" 
              objectFit="cover"
            />
            <div className="my-auto">
              Pokédex
            </div>
          </Link>
          <Link className="my-auto" href={'/list-pokemon/pokedex'}>
          <div className="relative">
            <Image className="hover:animate-spin border bg-white rounded-full" src='/loading.png' alt="" width={50} height={50}/>
            <div className="absolute left-0 top-0 bg-white rounded-full w-5">
              <p className="text-sm text-red-600 ">{pokedex.length}</p>
            </div>
          </div>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl my-10 w-full mx-auto">
        <div className="lg:mx-20 max-sm:mx-2">
          {children}
        </div>
      </div>
    </>
  );
}
