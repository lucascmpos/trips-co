import { BadgeCheck } from "lucide-react";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
      <h2 className="font-semibold text-secondary-foreground mb-2 lg:text-xl">
        Destaques
      </h2>

      <div className="flex flex-wrap space-y-3 lg:mt-5">
        {highlights.map((highlight, index) => (
          <div
            key={highlight}
            className="flex items-center gap-2 w-1/2 lg:w-full "
          >
            <BadgeCheck size={20} className="text-primary" />
            <p className="text-muted-foreground text-xs lg:text-base">
              {highlight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
