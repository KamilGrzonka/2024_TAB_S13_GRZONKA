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

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane zadania.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZadanieDTO {

    /**
     * Identyfikator zadania.
     */
    private Long id;

    /**
     * Koszt zadania.
     */
    @NotNull(message = "Koszt nie może być pusty")
    @PositiveOrZero(message = "Koszt nie może być ujemny")
    @Digits(integer = 10, fraction = 2, message = "Koszt musi mieć maksymalnie 10 cyfr całkowitych i 2 cyfry po przecinku")
    private BigDecimal koszt;

    /**
     * Opis zadania.
     */
    @Size(max = 65535, message = "Opis może mieć maksymalnie 65535 znaków")
    private String opis;

    /**
     * Data rozpoczęcia zadania.
     */
    @NotNull(message = "Data rozpoczęcia nie może być pusta")
    private Date dataRozpoczecia;

    /**
     * Data zakończenia zadania.
     */
    private Date dataZakonczenia;

    /**
     * Identyfikator firmy podwykonawczej przypisanej do zadania.
     */
    private Long firmaId;

    /**
     * Identyfikator zgłoszenia, do którego należy zadanie.
     */
    @NotNull(message = "Id zgloszenia nie może być puste")
    @PositiveOrZero(message = "Id zgloszenia nie może być ujemne")
    private Long zgloszenieId;

}
