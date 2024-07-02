import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-5">Localização</h2>

      <div className="relative h-[280px] w-full">
        <Image
          src="/map-mobile.png"
          alt={location}
          className="rounded-lg shadow-md"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <h3 className="text-primaryDarker text-sm font-semibold mt-3">
        {location}
      </h3>

      <p className="text-xs text-primaryDarker mt-2 leading-5">
        {locationDescription}
      </p>

      <Button disabled variant="outline" className="mt-5">
        <div className="flex flex-col">
          <h1>Ver no Google Maps</h1>{" "}
          <p className="text-xs text-secondary-foreground">Em breve</p>
        </div>
      </Button>
    </div>
  );
};

export default TripLocation;
