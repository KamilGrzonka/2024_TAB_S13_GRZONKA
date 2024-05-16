import { RepairStatus } from "./enums/RepairStatus";
import { RepairType } from "./enums/RepairType";

export interface RepairData {
    id: number; // id
    dataZgloszenia: Date; // nullable = false
    dataWykonania?: Date;
    statusZgloszenia: RepairStatus; // nullable = false
    typZgloszenia: RepairType; // nullable = false
    kosztCalkowity?: number; // scale = 2, precision = 10
    priorytet: number; // nullable = false
    meldunekId?: number;
    mieszkanieId?: number;
    budynekId?: number;
}