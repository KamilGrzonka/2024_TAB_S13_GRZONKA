export interface BuildingData {
  id: number; // id
  ulica: string; // length = 80, nullable = false
  numerBudynku: string; // length = 5, nullable = false
  kodPocztowy: string; // length = 6, nullable = false
  miasto: string; // length = 80, nullable = false
  liczbaMiejsc: number; // nullable = false
}
