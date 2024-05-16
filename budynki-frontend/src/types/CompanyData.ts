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