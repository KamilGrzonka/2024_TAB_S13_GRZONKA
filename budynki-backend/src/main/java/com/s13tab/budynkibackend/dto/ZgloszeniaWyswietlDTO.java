package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;
import java.sql.Date;

import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.enums.Typ;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca zgłoszenie do wyświetlenia.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZgloszeniaWyswietlDTO {

    /**
     * Identyfikator zgłoszenia.
     */
    private Long zgloszenieid;

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
    private Long budynekId;

    /**
     * Numer mieszkania, do którego dotyczy zgłoszenie.
     */
    private Integer numerMieszkania;

    /**
     * Imię osoby zgłaszającej.
     */
    private String imie;

    /**
     * Nazwisko osoby zgłaszającej.
     */
    private String nazwisko;

    /**
     * Data zgłoszenia.
     */
    private Date dataZgloszenia;

    /**
     * Status zgłoszenia.
     */
    private Status statusZgloszenia;

    /**
     * Typ zgłoszenia.
     */
    private Typ typZgloszenia;

    /**
     * Priorytet zgłoszenia.
     */
    private Short priorytet;

    /**
     * Opis zgłoszenia.
     */
    private String opis;

    /**
     * Data wykonania zgłoszenia.
     */
    private Date dataWykonania;

    /**
     * Całkowity koszt związany z wykonaniem zgłoszenia.
     */
    private BigDecimal kosztCalkowity;

}
