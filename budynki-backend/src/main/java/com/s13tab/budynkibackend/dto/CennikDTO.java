package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CennikDTO {

    private Long id;

    @NotNull(message = "Data początkowa nie może być pusta")
    private Date dataPoczatkowa;

    @NotNull(message = "Data końcowa nie może być pusta")
    private Date dataKoncowa;

    @NotNull(message = "Cena nie może być pusta")
    @PositiveOrZero(message = "Cena nie może być ujemna")
    @Digits(integer = 10, fraction = 2, message = "Cena musi mieć maksymalnie 10 cyfr całkowitych i 2 cyfry po przecinku")
    private BigDecimal cena;

    @NotNull(message = "Id mieszkania nie może być puste")
    @PositiveOrZero(message = "Id mieszkania nie może być ujemne")
    private Long mieszkanieId;

}
