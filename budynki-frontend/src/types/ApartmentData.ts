export interface ApartmentData {
  id: number; // id
  numerMieszkania: number; // nullable = false
  pietro: number; // nullable = false
  liczbaMieszkancow: number; // nullable = false
  opis: string; // length = 65535
  budynekId: number; // nullable = false
}
