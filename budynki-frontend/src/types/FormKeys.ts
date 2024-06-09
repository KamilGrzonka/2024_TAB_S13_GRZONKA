export type ApartmentFormKeys =
  | "numerMieszkania"
  | "pietro"
  | "liczbaMieszkancow"
  | "opis";

export type BuildingFormKeys =
  | "ulica"
  | "numerBudynku"
  | "kodPocztowy"
  | "miasto"
  | "liczbaMiejsc";

export type CompanyFormKeys =
  | "nazwa"
  | "nip"
  | "ulica"
  | "numerBudynku"
  | "numerLokalu"
  | "kodPocztowy"
  | "miasto";

export type IncomingPaymentFormKeys =
  | "dataZrealizowania"
  | "wartosc"
  | "meldunekId";

export type OutgoingPaymentFormKeys =
  | "dataZrealizowania"
  | "wartosc"
  | "zadanieId";

export type PersonFormKeys = "pesel" | "imie" | "nazwisko";

export type PriceListFormKeys = "dataPoczatkowa" | "dataKoncowa" | "cena";

export type RegistrationFormKeys =
  | "dataMeldunku"
  | "dataWymeldowania"
  | "wynajmujacy"
  | "osobaId"
  | "mieszkanieId";

export type RepairFormKeys =
  | "dataZgloszenia"
  | "statusZgloszenia"
  | "typZgloszenia"
  | "priorytet"
  | "opis"
  | "osobaId"
  | "mieszkanieId";

export type TaskFormKeys =
  | "koszt"
  | "opis"
  | "dataRozpoczecia"
  | "dataZakonczenia"
  | "firmaId";

export type AnyFormKeys =
  | ApartmentFormKeys
  | BuildingFormKeys
  | CompanyFormKeys
  | IncomingPaymentFormKeys
  | OutgoingPaymentFormKeys
  | PersonFormKeys
  | PriceListFormKeys
  | RegistrationFormKeys
  | RepairFormKeys
  | TaskFormKeys;
