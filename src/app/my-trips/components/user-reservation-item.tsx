import React from "react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

interface UserReservationItemProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>;
  fetchReservations: () => void;
}

const UserReservationItem = ({
  reservation,
  fetchReservations,
}: UserReservationItemProps) => {
  const router = useRouter();

  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const res = await fetch(`/api/trips/reservation/${reservation.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return toast({
        title: "Erro ao cancelar reserva",
        description:
          "Ocorreu um erro ao tentar cancelar a reserva. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }

    toast({
      title: "Reserva cancelada!",
      description: "Sua reserva foi cancelada com sucesso!",
      variant: "success",
    });

    fetchReservations();
  };

  return (
    <div>
      <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 ">
          <div className="relative h-[106px] w-[124px]">
            <Image
              src={trip.coverImage}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
              alt={trip.name}
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl text-secondary-foreground font-semibold">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-muted-foreground underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-2 mt-5 text-secondary-foreground">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Data</h3>
            <div className="flex items-center gap-1">
              <p className="text-sm">
                {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
              {" - "}
              <p className="text-sm">
                {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <h3 className=" text-sm font-medium">Hóspedes:</h3>
            <p className="text-sm ">{reservation.guests} hóspedes</p>
          </div>

          <div className="flex justify-between ">
            <p className="text-secondary-foreground font-medium text-sm mt-2">
              Total:
            </p>
            <p className="font-medium text-sm">
              R${Number(reservation.totalPaid)}
            </p>
          </div>

          <Separator />

          <Button
            variant="outline"
            className="mt-5 border-red-500 text-red-500"
            onClick={handleDeleteClick}
          >
            Cancelar reserva
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserReservationItem;
