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
