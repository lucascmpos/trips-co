import Image from "next/image";
import Link from "next/link";
import React from "react";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-center ">
        <div className="w-full h-[1px] bg-grayLighter " />
        <h2 className="font-medium px-5 text-muted-foreground whitespace-nowrap">
          Mais procurados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter " />
      </div>

      <div className="flex w-full justify-between mt-5 gap-2">
        <Link
          href={`/trips/search?text=hotel`}
          className="flex flex-col border rounded-lg p-2 w-1/4 cursor-pointer hover:bg-secondary items-center "
        >
          <Image src="/hotel-icon.png" width={32} height={32} alt="Hotel" />
          <p className="text-sm text-muted-foreground  mt-5">Hotel</p>
        </Link>

        <Link
          href={`/trips/search?text=fazenda`}
          className="flex flex-col border rounded-lg p-2 w-1/4 cursor-pointer hover:bg-secondary items-center "
        >
          <Image src="/farm-icon.png" width={32} height={32} alt="Fazenda" />
          <p className="text-sm text-muted-foreground  mt-5">Fazenda</p>
        </Link>

        <Link
          href={`/trips/search?text=chalé`}
          className="flex flex-col border rounded-lg p-2 w-1/4 cursor-pointer hover:bg-secondary items-center"
        >
          <Image src="/cottage-icon.png" width={32} height={32} alt="Chale" />
          <p className="text-sm text-muted-foreground  mt-5">Chalé</p>
        </Link>

        <Link
          href={`/trips/search?text=pousada`}
          className="flex flex-col border rounded-lg p-2 w-1/4 cursor-pointer hover:bg-secondary items-center "
        >
          <Image src="/inn-icon.png" width={32} height={32} alt="Pousada" />
          <p className="text-sm  text-muted-foreground  mt-5">Pousada</p>
        </Link>
      </div>
    </div>
  );
};

export default QuickSearch;
