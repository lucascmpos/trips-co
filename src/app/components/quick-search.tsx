import Image from "next/image";
import React from "react";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-center ">
        <div className="w-full h-[1px] bg-grayLighter " />
        <h2 className="font-medium px-5 text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter " />
      </div>

      <div className="flex w-full justify-between mt-5">
        <div className="flex flex-col items-center ">
          <Image src="/hotel-icon.png" width={32} height={32} alt="Hotel" />
          <p className="text-sm text-grayPrimary  mt-5">Hotel</p>
        </div>

        <div className="flex flex-col items-center ">
          <Image src="/farm-icon.png" width={32} height={32} alt="Fazenda" />
          <p className="text-sm text-grayPrimary  mt-5">Fazenda</p>
        </div>

        <div className="flex flex-col items-center ">
          <Image src="/cottage-icon.png" width={32} height={32} alt="Hotel" />
          <p className="text-sm text-grayPrimary  mt-5">Chalé</p>
        </div>

        <div className="flex flex-col items-center ">
          <Image src="/inn-icon.png" width={32} height={32} alt="Hotel" />
          <p className="text-sm text-grayPrimary  mt-5">Pousada</p>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
