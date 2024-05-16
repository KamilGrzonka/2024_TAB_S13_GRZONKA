import { z } from "zod";
import { zNonNegative, zNumber, zPositive, zStringMinMax } from "../zodWrapper";

export const apartmentFormSchema = z.object({
  numerMieszkania: zNumber().pipe(zPositive()), // nullable = false
  pietro: zNumber().pipe(zNonNegative()), // nullable = false
  liczbaMieszkancow: zNumber().pipe(zNonNegative()), // nullable = false
  opis: zStringMinMax({min: 0, max: 65535}).optional(), // length = 65535
});
