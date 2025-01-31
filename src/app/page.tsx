import QuickSearch from "./components/quick-search";
import RecommendedTrips from "./components/recommend-trips";
import TripSearch from "./components/trip-search";

export default function Home() {
  return (
    <div>
      <TripSearch />
      <QuickSearch />
      <RecommendedTrips />
    </div>
  );
}
