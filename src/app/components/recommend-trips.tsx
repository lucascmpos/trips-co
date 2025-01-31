"use server";
import TripItem from "@/components/trip-item";
import { db } from "@/lib/prisma";
import { Trip } from "@prisma/client";
import React from "react";

async function getTrips() {
  const trips = await db.trip.findMany({});

  return trips;
}

const RecommendedTrips = async () => {
  const data = await getTrips();

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-center ">
        <div className="w-full h-[1px] bg-grayLighter " />
        <h2 className="font-medium px-5 text-muted-foreground whitespace-nowrap">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter " />
      </div>

      <div className="flex flex-col gap-5 items-center mt-5 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-10 lg:mt-12">
        {data.map((trip: Trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
