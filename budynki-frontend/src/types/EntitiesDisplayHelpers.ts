import { RepairStatus } from "./enums/RepairStatus";
import { RepairType } from "./enums/RepairType";

export interface RegistrationDisplay {
  meldunekId: number;
  osobaId: number;
  mieszkanieId: number;
  numerMieszkania: number;
  imie: string;
  nazwisko: string;
  dataMeldunku: Date;
  dataWymeldowania?: Date;
  wynajmujacy: boolean;
}

export interface RepairDisplay {
  zgloszenieid: number;
  osobaId?: number;
  mieszkanieId?: number;
  budynekId: number;
  numerMieszkania: number;
  imie?: string;
  nazwisko?: string;
  dataZgloszenia: Date;
  statusZgloszenia: RepairStatus;
  typZgloszenia: RepairType;
  priorytet: number;
  opis?: string;
  dataWykonania?: Date;
  kosztCalkowity: number;
}

export type AnyEntityDisplayHelper = RegistrationDisplay | RepairDisplay;
