"use client";

import TripItem from "@/components/trip-item";
import { Trip } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Trips = () => {
  const [trips, setTrips] = React.useState<Trip[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?text=${
          searchParams.get("text") ?? ""
        }&startDate=${searchParams.get("startDate")}&budget=${searchParams.get(
          "budget"
        )}`
      );

      const data = await response.json();

      setTrips(data);
    };

    fetchTrips();
  }, [searchParams]);

  return (
    <div className="container mx-auto flex flex-col items-center lg:items-start p-5 lg:pt-10">
      <h1 className="text-secondary-foreground font-semibold text-xl lg:w-full lg:text-left lg:text-[2.5rem]">
        Viagens encontradas
      </h1>
      <h2 className="text-muted-foreground font-medium mb-5 lg:mt-6 lg:w-full lg:text-left">
        {trips.length > 0
          ? "Listamos as melhores viagens pra você!"
          : "Não encontramos nada nos seus parâmetros! "}
      </h2>

      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4 lg:gap-10 lg:mt-6 lg:pb-16">
        {trips?.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
