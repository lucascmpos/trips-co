import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12 lg:pb-20">
      <h2 className="font-semibold text-secondary-foreground mb-5 lg:text-xl">
        Localização
      </h2>

      <div className="relative h-[280px] w-full lg:hidden">
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg shadow-md"
        />
      </div>

      <div className="relative h-[480px] w-full hidden lg:block">
        <Image
          src="/map-desktop.png"
          alt={location}
          fill
          style={{
            objectFit: "cover",
          }}
          className="rounded-lg shadow-md"
        />
      </div>

      <h3 className="text-secondary-foreground text-sm font-semibold mt-3 lg:text-base lg:mt-5">
        {location}
      </h3>

      <p className="text-xs text-secondary-foreground mt-2 leading-5 lg:text-sm lg:mt-4">
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
