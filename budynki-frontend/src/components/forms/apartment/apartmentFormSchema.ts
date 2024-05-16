import { z } from "zod";
import { zNumberNonNegative, zNumberPositive } from "../zodWrapper";

export const apartmentFormSchema = z.object({
  numerMieszkania: zNumberPositive(),
  pietro: zNumberNonNegative(),
  liczbaMieszkancow: zNumberNonNegative(),
  opis: z.string().optional(),
});
