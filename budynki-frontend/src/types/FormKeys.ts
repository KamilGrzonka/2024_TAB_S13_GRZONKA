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

export type ContractFormKeys = "dataZawarcia" | "osobaId" | "cennikId";

export type IncomingPaymentFormKeys =
  | "dataZrealizowania"
  | "wartosc"
  | "umowaId";

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
  | "dataWykonania"
  | "statusZgloszenia"
  | "typZgloszenia"
  | "kosztCalkowity"
  | "priorytet"
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
  // | ContractFormKeys
  // | IncomingPaymentFormKeys
  // | OutgoingPaymentFormKeys
  | PersonFormKeys
  | PriceListFormKeys
  | RegistrationFormKeys
  | RepairFormKeys
  | TaskFormKeys;
