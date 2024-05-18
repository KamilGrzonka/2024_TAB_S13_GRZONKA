import { z } from "zod";

interface zNonValueArgs {
  message?: string;
}

export function zNumber({ message }: zNonValueArgs = {}) {
  message = message ?? "Wprowadź liczbę";
  return z.preprocess(
    (value) => {
      return value != "" ? value : undefined;
    },
    z.coerce.number({ invalid_type_error: message }),
  );
}

export function zNonNegative({ message }: zNonValueArgs = {}) {
  message = message ?? "Liczba nie może być ujemna";
  return z.number().nonnegative({ message: message });
}

export function zPositive({ message }: zNonValueArgs = {}) {
  message = message ?? "Liczba musi być dodatnia";
  return z.number().positive({ message: message });
}

interface zMinMaxArgs {
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
}

function odmiana(value: number) {
  return value < 2 ? "znak" : value < 5 ? "znaki" : "znaków";
}

export function zStringMinMax({
  min,
  minMessage,
  max,
  maxMessage,
}: zMinMaxArgs = {}) {
  min = min ?? 1;
  max = max ?? 80;
  minMessage = minMessage ?? `Wprowadź minimum ${min} ${odmiana(min)}`;
  maxMessage = maxMessage ?? `Wprowadź maksimum ${max} ${odmiana(max)}`;
  return z
    .string()
    .min(min, { message: minMessage })
    .max(max, { message: maxMessage });
}

export function zNumberMinMaxDigits({
  min,
  minMessage,
  max,
  maxMessage,
}: zMinMaxArgs = {}) {
  return z.coerce.string().pipe(
    zStringMinMax({
      min: min,
      minMessage: minMessage,
      max: max,
      maxMessage: maxMessage,
    }).pipe(zNumber()),
  );
}

export function zDate({ message }: zNonValueArgs) {
  return z.coerce.date({ message: message });
}

export const polishChars = "a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ";
