import React from "react";

interface TripDescriptionProps {
  description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-secondary-foreground">
        Sobre a viagem
      </h2>
      <p className="text-xs leading-5 text-secondary-foreground mt-3">
        {description}
      </p>
    </div>
  );
};

export default TripDescription;
