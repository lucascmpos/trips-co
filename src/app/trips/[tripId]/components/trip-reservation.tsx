import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Trip } from "@prisma/client";
import { User2 } from "lucide-react";
import React from "react";

interface TripReservationProps {
  trip: Trip;
}

const TripReservation = ({ trip }: TripReservationProps) => {
  return (
    <div className="px-5">
      <div className="flex flex-col pb-10  border-b border-grayLighter ">
        <div className="flex gap-4 ">
          <DatePicker placeholder="Data de início" />
          <DatePicker placeholder="Data final" />
        </div>
        <Input
          placeholder={`Número de hospedes (max: ${trip.maxGuests})`}
          className="mt-4"
        ></Input>

        <div className="flex justify-between mt-3">
          <p className="font-medium text-sm text-primaryDarker">Total: </p>

          <p className="font-medium text-sm text-primaryDarker">R$ Preço </p>
        </div>

        <Button className="mt-3">Reservar agora</Button>
      </div>
    </div>
  );
};

export default TripReservation;
