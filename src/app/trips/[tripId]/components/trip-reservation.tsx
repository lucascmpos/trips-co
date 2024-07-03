"use client";

import DatePicker from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Trip } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripReservationProps {
  tripId: string;
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
  tripId,
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
    setError,
  } = useForm<TripReservationForm>();

  const router = useRouter();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = await response.json();

    if (res.error) {
      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
        setError("startDate", {
          type: "manual",
          message: "Esta data já está reservada",
        });

        return setError("endDate", {
          type: "manual",
          message: "Esta data já está reservada",
        });
      }

      if (res.error.code === "INVALID_START_DATE") {
        return setError("startDate", {
          type: "manual",
          message: "Data de início inválida",
        });
      }

      if (res.error.code === "INVALID_END_DATE") {
        return setError("endDate", {
          type: "manual",
          message: "Data final inválida",
        });
      }
    }
    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate?.toISOString()}&endDate=${data.endDate?.toISOString()}&guests=${
        data.guests
      }`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="px-5">
      <div className="flex flex-col pb-10  border-b border-grayLighter lg:min-w-[380px] lg:p-5 lg:border lg:rounded-lg lg:shadow-lg ">
        <p className="text-xl hidden text-primaryDarker dark:text-primary-foreground mb-4 lg:block">
          <span className="font-semibold">R${pricePerDay}</span> / dia
        </p>

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
            max: {
              value: maxGuests,
              message: `Número de hospedes deve ser menor ou igual a ${maxGuests}`,
            },
          })}
          type="number"
          placeholder={`Número de hospedes (max: ${maxGuests})`}
          className="mt-4"
          error={!!errors.guests}
          errorMessage={errors.guests?.message}
        />

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-secondary-foreground">
            Total:{" "}
          </p>

          <p className="font-medium text-sm text-secondary-foreground">
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
