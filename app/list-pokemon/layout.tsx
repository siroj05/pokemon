'use client'
import { ReactNode } from "react";
import Image from 'next/image';
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  // const { pokedex } = useStatePokedex((state) => state)
  return (
    <>
      <div className="text-7xl bg-header text-yellow-400 text-stroke-3 text-center border-b-8 border-yellow-400 p-5 font-bold">
        <div className="flex justify-between gap-3 mx-10">
          <Link className='flex' href={'/'}>
            <Image className="hover:animate-spin" src='/pokemon-go.png' alt="" width={80} height={80}/>
            <div className="my-auto">
              Pokédex
            </div>
          </Link>
          <Link className="my-auto" href={'/list-pokemon/pokedex'}>
            <Image className="hover:animate-spin border bg-white rounded-full" src='/loading.png' alt="" width={50} height={50}/>
          </Link>
        </div>
      </div>
      <div className="max-w-4xl my-10 w-full mx-auto">
        {children}
      </div>
    </>
  );
}
