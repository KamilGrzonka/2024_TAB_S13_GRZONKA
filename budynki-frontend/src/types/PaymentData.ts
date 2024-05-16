export interface PaymentData {
    id: number; // id
    dataZrealizowania: Date; // nullable = false
    wartosc: number; // scale = 2, precision = 10, nullable = false
    zadanieId: number;
    umowaId: number;
}