import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip;
}

export const TripHeader = ({ trip }: TripHeaderProps) => {
  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  return (
    <div>
      <div className="flex-col justify-between w-full">
        <div className="relative h-[300px] w-full">
          <Image
            src={trip?.coverImage}
            alt={trip?.name}
            style={{
              objectFit: "cover",
            }}
            fill
          />
        </div>
        <div className="flex justify-between items-center p-5 w-full">
          <div className="flex flex-col w-full p-5">
            <h1 className="font-semibold text-xl text-secondary-foreground">
              {trip.name}
            </h1>

            <div className="flex items-center my-1 gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-muted-foreground underline">
                {trip.location}
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              <span className="text-primary font-medium">
                R$ {trip.pricePerDay.toString()}
              </span>{" "}
              por dia
            </p>
          </div>

          <div className="flex-col border p-2 items-center justify-center rounded-lg space-y-1 ">
            <p className="text-xs text-center text-muted-foreground">
              Data da viagem
            </p>
            <div className=" font-medium gap-1 text-secondary-foreground flex">
              <p className="text-xs">{formatDate(trip.startDate)} </p>
              <p className="text-xs">até</p>
              <p className="text-xs"> {formatDate(trip.endDate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
