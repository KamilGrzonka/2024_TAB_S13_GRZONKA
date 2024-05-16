export interface TaskData {
    id: number; // id
    koszt: number; // scale = 2, precision = 10, nullable = false
    opis: string; // length = 65535
    dataRozpoczecia: Date; // nullable = false
    dataZakonczenia: Date;
    firmaId: number;
    zgloszenieId: number; // nullable = false
}