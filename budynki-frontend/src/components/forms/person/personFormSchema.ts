import { z } from "zod";
import { polishChars, zNumber, zNumberMinMaxDigits, zStringMinMax } from "../zodWrapper";

export const personFormSchema = z.object({
  pesel: zNumber().pipe(zNumberMinMaxDigits({min: 11, max: 11})), // length = 11, nullable = false, unique = true
  imie: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne imię"), // length = 40, nullable = false
  nazwisko: zStringMinMax({ max: 40 }).regex(RegExp(`^[${polishChars} -]+$`), "Wprowadź poprawne nazwisko"), // length = 40, nullable = false
});
