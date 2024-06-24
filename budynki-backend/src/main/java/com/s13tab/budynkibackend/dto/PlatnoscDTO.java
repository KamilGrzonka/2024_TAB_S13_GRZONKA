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

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane płatności.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlatnoscDTO {

    /**
     * Identyfikator płatności.
     */
    private Long id;

    /**
     * Data zrealizowania płatności.
     */
    @NotNull(message = "Pole dataZrealizowania nie może być puste")
    private Date dataZrealizowania;

    /**
     * Wartość płatności.
     */
    @NotNull(message = "Pole wartosc nie może być puste")
    @PositiveOrZero(message = "Wartość nie może być ujemna")
    @Digits(integer = 10, fraction = 2, message = "Wartość musi mieć maksymalnie 10 cyfr całkowitych i 2 cyfry po przecinku")
    private BigDecimal wartosc;

    /**
     * Identyfikator zadania, do którego należy płatność.
     */
    private Long zadanieId;

    /**
     * Identyfikator meldunku, do którego należy płatność.
     */
    private Long meldunekId;

}
