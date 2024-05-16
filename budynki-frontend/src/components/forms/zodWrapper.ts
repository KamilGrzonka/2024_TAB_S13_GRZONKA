import { z } from "zod";

interface zNumberArgs {
  invalid_type_error?: string;
}

interface zNumberPlusArgs {
  invalid_type_error?: string;
  message?: string;
}

export function zNumber({ invalid_type_error }: zNumberArgs = {}) {
  invalid_type_error = invalid_type_error || "Wprowadź liczbę";
  return z.preprocess(
    (value) => {
      return value != "" ? value : undefined;
    },
    z.coerce.number({ invalid_type_error: invalid_type_error }),
  );
}

export function zNumberNonNegative({
  invalid_type_error,
  message,
}: zNumberPlusArgs = {}) {
  invalid_type_error = invalid_type_error || "Wprowadź liczbę";
  message = message || "Liczba nie może być ujemna";
  return z.preprocess(
    (value) => {
      return value != "" ? value : undefined;
    },
    z.coerce
      .number({ invalid_type_error: invalid_type_error })
      .nonnegative({ message: message }),
  );
}

export function zNumberPositive({
  invalid_type_error,
  message,
}: zNumberPlusArgs = {}) {
  invalid_type_error = invalid_type_error || "Wprowadź liczbę";
  message = message || "Liczba musi być dodatnia";
  return z.preprocess(
    (value) => {
      return value != "" ? value : undefined;
    },
    z.coerce
      .number({ invalid_type_error: invalid_type_error })
      .positive({ message: message }),
  );
}
