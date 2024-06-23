package com.s13tab.budynkibackend.dto;

import java.sql.Date;

import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.enums.Typ;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZgloszenieDTO {

    private Long id;

    @NotNull(message = "Data zgłoszenia nie może być pusta")
    private Date dataZgloszenia;

    @NotNull(message = "Status zgłoszenia nie może być pusty")
    private Status statusZgloszenia;

    @NotNull(message = "Typ zgłoszenia nie może być pusty")
    private Typ typZgloszenia;

    @NotNull(message = "Priorytet nie może być pusty")
    private Short priorytet;

    @Size(max = 65535, message = "Opis może mieć maksymalnie 65535 znaków")
    private String opis;

    private Long osobaId;

    private Long mieszkanieId;

    @NotNull(message = "Id budynku nie może być puste")
    @PositiveOrZero(message = "Id budynku nie może być ujemne")
    private Long budynekId;

    // private List<Long> zadaniaId;

}
