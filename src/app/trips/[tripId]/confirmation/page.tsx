"use client";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const searchParams = useSearchParams();

  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch(`/api/trips/check`, {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
        }),
      });

      const { trip, totalPrice } = await response.json();

      setTrip(trip);
      setTotalPrice(totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/");
    }

    fetchTrip();
  }, [status]);

  if (!trip) return null;

  const startDate = new Date(searchParams.get("startDate") as string);

  const endDate = new Date(searchParams.get("endDate") as string);

  const guests = searchParams.get("guests");

  return (
    <div className="container mx-auto  p-5">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem</h1>

      <div className="flex flex-col p-5 mt-5 border  shadow-lg rounded-md">
        <div className="flex items-center gap-3 pb-5 border-b border-solid">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip?.coverImage}
              fill
              style={{ objectFit: "cover" }}
              alt={trip.name}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-primaryDarker font-semibold">
              {trip.name}
            </h2>

            <div className="flex items-center  gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary ">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-primaryDarker">Data:</p>

          <div className="flex">
            <p className="text-primaryDarker font-medium">
              {format(startDate, "dd 'de' MMMM", { locale: ptBR })}{" "}
            </p>

            <p className="text-primaryDarker font-medium">&nbsp;-&nbsp;</p>

            <p className="text-primaryDarker font-medium">
              {format(endDate, "dd 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-primaryDarker">Hóspedes:</p>

          <p className="text-primaryDarker font-medium">{guests} hóspedes</p>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-primaryDarker">Preço:</p>

          <p className="text-primaryDarker font-medium">R$ {totalPrice}</p>
        </div>
      </div>

      <Button className="w-full mt-8">Finalizar compra</Button>
    </div>
  );
};

export default TripConfirmation;
