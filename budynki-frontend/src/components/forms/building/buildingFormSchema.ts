import { z } from "zod";
import { polishChars, zNonNegative, zNumber, zStringMinMax } from "../zodWrapper";

export const buildingFormSchema = z.object({
  ulica: zStringMinMax(), // length = 80, nullable = false
  numerBudynku: zStringMinMax({max: 5}).regex(RegExp(`^\\d+[${polishChars}]?$`), "Wprowadź poprawny numer budynku"), // length = 5, nullable = false
  kodPocztowy: zStringMinMax({min: 6, max: 6}).regex(/^\d{2}-\d{3}$/, "Wprowadź poprawny kod pocztowy"), // length = 6, nullable = false
  miasto: zStringMinMax().regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne miasto"), // length = 80, nullable = false
  liczbaMiejsc: zNumber().pipe(zNonNegative()), // nullable = false
});
