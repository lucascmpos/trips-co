import CurrencyInput from "@/components/currency-input";
import SearchButton from "@/components/search-button";
import { DatePicker } from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import React from "react";

const TripSearch = () => {
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-2xl text-center text-primaryDarker">
        Encontre sua próxima <span className="text-primary">viagem</span>!
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />
        <div className="flex gap-4">
          <DatePicker />
          <CurrencyInput placeholder="Orçamento" />
        </div>

        <SearchButton>Buscar</SearchButton>
      </div>
    </div>
  );
};

export default TripSearch;
