import BuildingLabel from "@/components/BuildingLabel";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";

interface PersonData {
  pesel: number;
  imieINazwisko: string;
  najmujacy: boolean;
}

async function fetchPersons() {
  const persons: PersonData[] = await fetch(
    "http://localhost:8080/api/osoby",
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    return response.json();
  });
  return persons;
}

export default function PersonsList() {
  const persons = useQuery({
    queryKey: ["persons"],
    queryFn: fetchPersons,
  });

  return persons.isSuccess ? (
    persons.data.map(
      (
        person, // ToDo osoby to nie budynki
      ) => (
        <BuildingLabel
          key={person.pesel}
          name={person.imieINazwisko}
          address={`${person.pesel} ${person.najmujacy ? "najmujacy" : "nie najmujacy"}`}
          id={person.pesel}
        />
      ),
    )
  ) : persons.isPending ? (
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