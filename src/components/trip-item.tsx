import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface TripItemProps {
  trip: Trip;
}

const TripItem = ({ trip }: TripItemProps) => {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col rounded-lg hover:bg-secondary pb-5 border w-fit">
        <div className="relative h-[280px] w-[280px]">
          <Image
            src={trip.coverImage}
            alt={trip.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
        <div className="flex flex-col px-2">
          <h3 className="text-primaryDarker  font-medium text-sm mt-2">
            {trip.name}
          </h3>
          <div className="flex items-center my-1 gap-1">
            <ReactCountryFlag countryCode={trip.countryCode} svg />
            <p className="text-xs text-grayPrimary">{trip.location}</p>
          </div>

          <p className="text-xs text-grayPrimary">
            <span className="text-primary font-medium">
              R$ {trip.pricePerDay.toString()}
            </span>{" "}
            por dia
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TripItem;
