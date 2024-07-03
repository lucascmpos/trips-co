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
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl text-primaryDarker">
          {trip.name}
        </h1>

        <div className="flex items-center my-1 gap-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs text-grayPrimary underline">{trip.location}</p>
        </div>

        <p className="text-xs text-grayPrimary">
          <span className="text-primary font-medium">
            R$ {trip.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>

        <div className="flex-col w-full gap-2 mt-1 ">
          <p className="text-xs text-grayPrimary">
            Data disponível para viagem:
          </p>
          <div className=" font-medium gap-1 text-primaryDarker flex">
            <span className="text-xs">{formatDate(trip.startDate)} </span>
            <span className="text-xs">até</span>
            <span className="text-xs"> {formatDate(trip.endDate)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
