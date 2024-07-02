"use server";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { TripHeader } from "./components/trip-header";
import TripReservation from "./components/trip-reservation";
import TripDescription from "./components/trip-description";

const getTripDetails = async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
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
    <div className="">
      <TripHeader trip={trip} />

      <TripReservation trip={trip} />

      <TripDescription description={trip.description} />
    </div>
  );
};

export default TripDetails;
