import { BadgeCheck } from "lucide-react";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}

const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-secondary-foreground mb-2">
        Destaques
      </h2>

      <div className="flex flex-wrap space-y-3">
        {highlights.map((highlight, index) => (
          <div key={highlight} className="flex items-center gap-2 w-1/2">
            <BadgeCheck size={20} className="text-primary" />
            <p className="text-muted-foreground text-xs">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
