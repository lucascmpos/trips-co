"use server";
import { db } from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";

import TripReservation from "./components/trip-reservation";
import TripDescription from "./components/trip-description";
import TripHighlights from "./components/trip-highlights";
import TripLocation from "./components/trip-location";
import TripHeader from "./components/trip-header";

const getTripDetails = async (tripId: string) => {
  const trip = await db.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return trip;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="lg:container mx-auto lg:px-40">
      <TripHeader trip={trip} />

      <div className="flex flex-col lg:flex-row lg:mt-12 lg:gap-20">
        <div className="lg:order-2">
          <TripReservation
            tripId={trip.id}
            pricePerDay={trip.pricePerDay as any}
            maxGuests={trip.maxGuests}
            tripStartDate={trip.startDate}
            tripEndDate={trip.endDate}
          />
        </div>

        <div className="lg:order-1">
          <TripDescription description={trip.description} />

          <TripHighlights highlights={trip.highlights} />
        </div>
      </div>

      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
