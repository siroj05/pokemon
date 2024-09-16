'use client'
import { ReactNode } from "react";

import { useStatePokedex } from "./pokedex/store";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const { pokedex } = useStatePokedex((state) => state);

  return (
    <div className="flex flex-col min-h-dvh">
      <Header pokedex={pokedex}/>
      <div className="max-w-4xl my-10 w-full mx-auto">
        <div className="lg:mx-20 max-sm:mx-2">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
