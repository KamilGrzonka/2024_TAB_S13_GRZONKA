export interface PersonData {
  id: number; // id
  pesel: number; // length = 11, nullable = false, unique = true
  imie: string; // length = 40, nullable = false
  nazwisko: string; // length = 40, nullable = false
}
