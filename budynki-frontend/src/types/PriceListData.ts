export interface PriceListData {
    id: number; // id
    dataPoczatkowa: Date; // nullable = false
    dataKoncowa: Date; // nullable = false
    cena: number; // scale = 2, precision = 10, nullable = false
    mieszkanie: number; // nullable = false
}