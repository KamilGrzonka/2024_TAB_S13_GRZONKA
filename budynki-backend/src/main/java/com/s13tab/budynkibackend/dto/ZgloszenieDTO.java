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

/**
 * Klasa DTO (Data Transfer Object) reprezentująca zgłoszenie.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZgloszenieDTO {

    /**
     * Identyfikator zgłoszenia.
     */
    private Long id;

    /**
     * Data zgłoszenia.
     */
    @NotNull(message = "Data zgłoszenia nie może być pusta")
    private Date dataZgloszenia;

    /**
     * Status zgłoszenia.
     */
    @NotNull(message = "Status zgłoszenia nie może być pusty")
    private Status statusZgloszenia;

    /**
     * Typ zgłoszenia.
     */
    @NotNull(message = "Typ zgłoszenia nie może być pusty")
    private Typ typZgloszenia;

    /**
     * Priorytet zgłoszenia.
     */
    @NotNull(message = "Priorytet nie może być pusty")
    private Short priorytet;

    /**
     * Opis zgłoszenia.
     */
    @Size(max = 65535, message = "Opis może mieć maksymalnie 65535 znaków")
    private String opis;

    /**
     * Identyfikator osoby zgłaszającej.
     */
    private Long osobaId;

    /**
     * Identyfikator mieszkania, do którego dotyczy zgłoszenie.
     */
    private Long mieszkanieId;

    /**
     * Identyfikator budynku, do którego należy mieszkanie zgłaszającego.
     */
    @NotNull(message = "Id budynku nie może być puste")
    @PositiveOrZero(message = "Id budynku nie może być ujemne")
    private Long budynekId;

}
