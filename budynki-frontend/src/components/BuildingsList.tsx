import { useQuery } from "@tanstack/react-query";
import BuildingLabel from "./BuildingLabel";
import { LoaderCircle } from "lucide-react";
import { getBackendApi } from "./fetchBackendApi";
import { BuildingData } from "@/types/Entities";

export default function BuildingsList() {
  const buildings = useQuery({
    queryKey: ["buildings"],
    queryFn: () => getBackendApi<BuildingData[]>(`/budynki`),
  });

  return buildings.isSuccess ? (
    buildings.data.map((building) => (
      <BuildingLabel
        key={building.id}
        name={`${building.numerBudynku} ${building.ulica}`}
        address={`${building.numerBudynku} ${building.ulica}, ${building.kodPocztowy} ${building.miasto}`}
        id={building.id}
      />
    ))
  ) : buildings.isLoading ? (
    <div className="flex items-center justify-center">
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      Loading...
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <span className="text-red-700">Error!</span>
    </div>
  );
}
