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
public class PlatnoscDTO {

    private Long id;

    @NotNull(message = "Pole dataZrealizowania nie może być puste")
    private Date dataZrealizowania;

    @NotNull(message = "Pole wartosc nie może być puste")
    @PositiveOrZero(message = "Wartość nie może być ujemna")
    @Digits(integer = 10, fraction = 2, message = "Wartość musi mieć maksymalnie 10 cyfr całkowitych i 2 cyfry po przecinku")
    private BigDecimal wartosc;

    private Long zadanieId;

    private Long meldunekId;

}
