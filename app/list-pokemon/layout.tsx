import { ReactNode } from "react";
import Image from 'next/image';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="text-7xl bg-header text-yellow-400 text-stroke-3 text-center border-b-8 border-yellow-400 p-5 font-bold">
        <div className="flex justify-center gap-3">
          <Image src='/pokemon-go.png' alt="" width={80} height={80}/>
          <div className="my-auto">
            Pokédex
          </div>
        </div>
      </div>
      <div className="max-w-4xl my-10 w-full mx-auto">
        {children}
      </div>
    </>
  );
}
