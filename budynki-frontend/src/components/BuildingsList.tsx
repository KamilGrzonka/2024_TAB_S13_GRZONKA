import { useQuery } from "@tanstack/react-query";
import BuildingLabel from "./BuildingLabel";
import { LoaderCircle } from "lucide-react";
import { BuildingData } from "@/types/BuildingData";

async function fetchBuildings() {
  const buildings: BuildingData[] = await fetch(
    "http://localhost:8080/api/budynki",
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return buildings;
}

export default function BuildingsList() {
  const buildings = useQuery({
    queryKey: ["buildings"],
    queryFn: fetchBuildings,
  });

  return buildings.isSuccess ? (
    buildings.data.map((building) => (
      <BuildingLabel
        key={building.numerBudynku}
        name={building.adres.split(",")[0]}
        address={building.adres}
        id={building.numerBudynku}
      />
    ))
  ) : buildings.isPending ? (
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
