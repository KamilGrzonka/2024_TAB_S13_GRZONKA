package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.validation.constraints.Digits;
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
public class ZadanieDTO {

    private Long id;

    @NotNull(message = "Koszt nie może być pusty")
    @PositiveOrZero(message = "Koszt nie może być ujemny")
    @Digits(integer = 10, fraction = 2, message = "Koszt musi mieć maksymalnie 10 cyfr całkowitych i 2 cyfry po przecinku")
    private BigDecimal koszt;

    @Size(max = 65535, message = "Opis może mieć maksymalnie 65535 znaków")
    private String opis;

    @NotNull(message = "Data rozpoczęcia nie może być pusta")
    private Date dataRozpoczecia;

    private Date dataZakonczenia;

    private Long firmaId;

    @NotNull(message = "Id zgloszenia nie może być puste")
    @PositiveOrZero(message = "Id zgloszenia nie może być ujemne")
    private Long zgloszenieId;

}
