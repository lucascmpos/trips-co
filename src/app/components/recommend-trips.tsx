import TripItem from "@/components/trip-item";
import { Trip } from "@prisma/client";
import React from "react";

const RecommendedTrips = async () => {
  const data = await fetch("http://localhost:3000/hello").then((res) =>
    res.json()
  );
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center justify-center ">
        <div className="w-full h-[1px] bg-grayLighter " />
        <h2 className="font-medium px-5 text-grayPrimary whitespace-nowrap">
          Destinos recomendados
        </h2>
        <div className="w-full h-[1px] bg-grayLighter " />
      </div>

      <div className="flex flex-col gap-5 items-center mt-5">
        {data.map((trip: Trip) => (
          <TripItem trip={trip} key={trip.id} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTrips;
