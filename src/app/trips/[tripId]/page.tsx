"use server";
import { db } from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { TripHeader } from "./components/trip-header";
import TripReservation from "./components/trip-reservation";
import TripDescription from "./components/trip-description";
import TripHighlights from "./components/trip-highlights";
import TripLocation from "./components/trip-location";

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
    <div className="lg:container mx-auto">
      <TripHeader trip={trip} />

      <TripReservation
        tripId={trip.id}
        pricePerDay={trip.pricePerDay as any}
        maxGuests={trip.maxGuests}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
      />

      <TripDescription description={trip.description} />

      <TripHighlights highlights={trip.highlights} />

      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
