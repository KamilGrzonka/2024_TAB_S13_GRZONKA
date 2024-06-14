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

function odmianaZnak(value: number) {
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
  minMessage = minMessage ?? `Wprowadź minimum ${min} ${odmianaZnak(min)}`;
  maxMessage = maxMessage ?? `Wprowadź maksimum ${max} ${odmianaZnak(max)}`;
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

export function zDate({ message }: zNonValueArgs = {}) {
  message = message ?? "Podaj datę";
  return z.coerce.date({
    message: message,
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? message : defaultError,
    }),
  });
}

export function zOptional(schema: z.ZodTypeAny) {
  return schema.or(z.literal(""));
}

interface zEnumArgs {
  enums: readonly [string, ...string[]];
  message?: string;
}

export function zEnum({ enums, message }: zEnumArgs) {
  message = message ?? "Wybierz jedną z podanych opcji";
  return z.enum(enums, { message: message });
}

function odmianaCyfra(value: number) {
  return value != 2 ? "cyfr" : "cyfry";
}

interface zPrecisionNumberArgs {
  minPrecision?: number;
  maxPrecision?: number;
  minScale?: number;
  maxScale?: number;
  precisionMessage?: string;
  scaleMessage?: string;
}

export function zNumberPrecisionScale({
  minPrecision,
  maxPrecision,
  minScale,
  maxScale,
  precisionMessage,
  scaleMessage,
}: zPrecisionNumberArgs = {}) {
  minPrecision = minPrecision ?? 1;
  maxPrecision = maxPrecision ?? 10;
  minScale = minScale ?? 0;
  maxScale = maxScale ?? 2;
  precisionMessage = `Liczba musi mieć od ${minPrecision} do ${maxPrecision} ${odmianaCyfra(maxPrecision)}.`;
  scaleMessage = `Liczba musi mieć od ${minScale} do ${maxScale} ${odmianaCyfra(maxScale)} po separatorze dziesiętnym.`;
  return z.number().superRefine((n, ctx) => {
    const nArray = n.toString().split(".");
    const precision = (nArray[0]?.length || 0) + (nArray[1]?.length || 0);
    const scale = nArray[1]?.length || 0;
    (precision < minPrecision || precision > maxPrecision) &&
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: precisionMessage,
      });
    (scale < minScale || scale > maxScale) &&
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: scaleMessage,
      });
  });
}

export function zBoolean() {
  return z.coerce.boolean();
}

export const polishChars = "a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ";
