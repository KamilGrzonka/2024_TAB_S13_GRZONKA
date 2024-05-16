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

export function zNumberMinMaxDigits({ // only works for positive numbers
  min,
  minMessage,
  max,
  maxMessage,
}: zMinMaxArgs = {}) {
  min = min || 1;
  max = max || 10;
  min = Math.abs(min);
  max = Math.abs(max);
  const minNumber = Number("1"+"0".repeat(min-1));
  const maxNumber = Number("9".repeat(max));
  minMessage = minMessage ?? `Wprowadź minimum ${min} ${odmiana(min)}`;
  maxMessage = maxMessage ?? `Wprowadź maksimum ${max} ${odmiana(max)}`;
  return z
    .number()
    .min(minNumber, { message: minMessage })
    .max(maxNumber, { message: maxMessage });
}

export const polishChars = "a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ";
