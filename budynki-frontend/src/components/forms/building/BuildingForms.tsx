import FormGenerator from "../FormGenerator";
import { buildingForm } from "./buildingFormSchema";

export function BuildingFormAdd() {
  return (
    <>
      <h2 className="pb-5 text-3xl tracking-tight">Dodawanie budynku</h2>
      <FormGenerator
        formDefiner={buildingForm({
          endpoint: `/budynki`,
          method: "POST",
        })}
      />
    </>
  );
}
