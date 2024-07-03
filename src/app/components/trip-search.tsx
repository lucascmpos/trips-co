"use client";
import CurrencyInput from "@/components/currency-input";
import DatePicker from "@/components/date-picker";
import SearchButton from "@/components/search-button";
import Input from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  startDate: Date | null;
  budget: string;
}

const TripSearch = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  const router = useRouter();

  const onSubmit = (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${
        data.text
      }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`
    );
  };
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-2xl text-center text-secondary-foreground">
        Encontre sua próxima <span className="text-primary">viagem</span>!
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 mt-5">
        <Input
          {...register("text", {
            required: {
              value: true,
              message: "Campo obrigatório",
            },
          })}
          error={!!errors.text}
          errorMessage={errors.text?.message}
          placeholder="Onde você quer ir?"
        />
        <div className="flex gap-4 ">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                selected={field.value}
                onChange={field.onChange}
                placeholderText="Data de ida"
              />
            )}
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                placeholder="Orçamento"
              />
            )}
          />
        </div>

        <SearchButton onClick={handleSubmit(onSubmit)}>Buscar</SearchButton>
      </div>
    </div>
  );
};

export default TripSearch;
