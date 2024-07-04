"use client";
import { Trip } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const { toast } = useToast();
  const searchParams = useSearchParams();

  const { status, data } = useSession();

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

      const res = await response.json();

      if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
        return router.push(`/`);
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }

    fetchTrip();
  }, [params.tripId, router, searchParams, status]);

  if (!trip) return null;

  const handleBuyClick = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        })
      ),
    });

    if (!res.ok) {
      return toast({
        title: "Erro",
        description: "Ocorreu um erro, tente novamente.",
        variant: "destructive",
      });
    }

    const { sessionId } = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string
    );

    await stripe?.redirectToCheckout({ sessionId });

    toast({
      title: "Reserva realizada!",
      description: "Sua viagem foi reservada com sucesso!",
      variant: "success",
    });
  };

  const startDate = new Date(searchParams.get("startDate") as string);

  const endDate = new Date(searchParams.get("endDate") as string);

  const guests = searchParams.get("guests");

  return (
    <div className="container mx-auto  p-5">
      <h1 className="font-semibold text-xl text-secondary-foreground">
        Sua viagem
      </h1>

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
            <h2 className="text-xl text-secondary-foreground font-semibold">
              {trip.name}
            </h2>

            <div className="flex items-center  gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-muted-foreground ">{trip.location}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-secondary-foreground">Data:</p>

          <div className="flex">
            <p className="text-secondary-foreground font-medium">
              {format(startDate, "dd 'de' MMMM", { locale: ptBR as any })}{" "}
            </p>

            <p className="text-secondary-foreground font-medium">
              &nbsp;-&nbsp;
            </p>

            <p className="text-secondary-foreground font-medium">
              {format(endDate, "dd 'de' MMMM", { locale: ptBR as any })}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-secondary-foreground">Hóspedes:</p>

          <p className="text-secondary-foreground font-medium">
            {guests} hóspedes
          </p>
        </div>

        <div className="flex justify-between mt-3">
          <p className="text-secondary-foreground">Preço:</p>

          <p className="text-secondary-foreground font-medium">
            R$ {totalPrice}
          </p>
        </div>
      </div>

      <Button onClick={handleBuyClick} className="w-full mt-8">
        Finalizar compra
      </Button>
    </div>
  );
};

export default TripConfirmation;
