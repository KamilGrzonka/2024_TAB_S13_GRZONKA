import { RepairStatus } from "./enums/RepairStatus";
import { RepairType } from "./enums/RepairType";

export interface ApartmentData {
  id: number; // id
  numerMieszkania: number; // nullable = false
  pietro: number; // nullable = false
  liczbaMieszkancow: number; // nullable = false
  opis?: string; // length = 65535
  budynekId: number; // nullable = false
}

export interface BuildingData {
  id: number; // id
  ulica: string; // length = 80, nullable = false
  numerBudynku: string; // length = 5, nullable = false
  kodPocztowy: string; // length = 6, nullable = false
  miasto: string; // length = 80, nullable = false
  liczbaMiejsc: number; // nullable = false
}

export interface CompanyData {
  id: number; // id
  nazwa: string; // length = 100, nullable = false
  nip: string; // length = 10, nullable = false, unique = true
  ulica: string; // length = 80, nullable = false
  numerBudynku: string; // length = 5, nullable = false
  numerLokalu?: string; // length = 5
  kodPocztowy: string; // length = 6, nullable = false
  miasto: string; // length = 80, nullable = false
}

export interface PaymentData {
  id: number; // id
  dataZrealizowania: Date; // nullable = false
  wartosc: number; // scale = 2, precision = 10, nullable = false
  zadanieId?: number;
  meldunekId?: number;
}

export interface PersonData {
  id: number; // id
  pesel: number; // length = 11, nullable = false, unique = true
  imie: string; // length = 40, nullable = false
  nazwisko: string; // length = 40, nullable = false
}

export interface PriceListData {
  id: number; // id
  dataPoczatkowa: Date; // nullable = false
  dataKoncowa: Date; // nullable = false
  cena: number; // scale = 2, precision = 10, nullable = false
  mieszkanie: number; // nullable = false
}

export interface RegistrationData {
  id: number; // id
  dataMeldunku: Date; // nullable = false
  dataWymeldowania?: Date;
  wynajmujacy: boolean;
  osobaId: number; // nullable = false
  mieszkanieId: number; // nullable = false
}

export interface RepairData {
  id: number; // id
  dataZgloszenia: Date; // nullable = false
  statusZgloszenia: RepairStatus; // nullable = false
  typZgloszenia: RepairType; // nullable = false
  priorytet: number; // nullable = false
  opis?: string; // length = 65535
  osobaId?: number;
  mieszkanieId?: number;
  budynekId: number; // nullable = false
}

export interface TaskData {
  id: number; // id
  koszt: number; // scale = 2, precision = 10, nullable = false
  opis?: string; // length = 65535
  dataRozpoczecia: Date; // nullable = false
  dataZakonczenia?: Date;
  firmaId?: number;
  zgloszenieId: number; // nullable = false
}

export type AnyEntity =
  | ApartmentData
  | BuildingData
  | CompanyData
  | PaymentData
  | PersonData
  | PriceListData
  | RegistrationData
  | RepairData
  | TaskData;
