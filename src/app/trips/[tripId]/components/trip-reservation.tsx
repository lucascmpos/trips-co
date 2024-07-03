"use client";

import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface TripReservationForm {
  guests: number;
  startDate: Date | null;
  endDate: Date | null;
}

const TripReservation = ({
  tripStartDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="px-5">
      <div className="flex flex-col pb-10  border-b border-grayLighter ">
        <div className="flex gap-4 ">
          <Controller
            name="startDate"
            rules={{
              required: {
                value: true,
                message: "Data de início é obrigatório",
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                selected={field.value}
                onChange={field.onChange}
                placeholderText="Data de início"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                minDate={tripStartDate}
              />
            )}
          />

          <Controller
            name="endDate"
            rules={{
              required: {
                value: true,
                message: "Data final é obrigatório",
              },
            }}
            control={control}
            render={({ field }) => (
              <DatePicker
                className="w-full"
                selected={field.value}
                onChange={field.onChange}
                placeholderText="Data final"
                error={!!errors.endDate}
                errorMessage={errors.endDate?.message}
                maxDate={tripEndDate}
                minDate={startDate ?? tripStartDate}
              />
            )}
          />
        </div>
        <Input
          {...register("guests", {
            required: {
              value: true,
              message: "Número de hospedes é obrigatório",
            },
          })}
          placeholder={`Número de hospedes (max: ${maxGuests})`}
          className="mt-4"
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>

          <p className="font-medium text-sm text-primaryDarker">
            {startDate && endDate
              ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}`
              : "R$ 0"}
          </p>
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3">
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
