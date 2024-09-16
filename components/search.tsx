"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchPokemon() {
  const ref = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    const value = ref.current?.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-2xl mb-5 flex">
      <form action="" className="w-full" onSubmit={(e) => handleSearch(e)}>
        <Input
          ref={ref}
          className="bg-white "
          type="text"
          placeholder="Search..."
        />
        <Button
          type="submit"
          className="bg-blue-700 absolute right-0 top-0.5 hover:bg-blue-800"
          size={"sm"}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
