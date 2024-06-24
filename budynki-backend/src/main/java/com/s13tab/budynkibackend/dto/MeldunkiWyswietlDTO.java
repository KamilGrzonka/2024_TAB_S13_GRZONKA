package com.s13tab.budynkibackend.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane do wyświetlenia meldunku.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeldunkiWyswietlDTO {

    /**
     * Identyfikator meldunku.
     */
    private Long meldunekId;

    /**
     * Id osoby związanej z meldunkiem.
     */
    private Long osobaId;

    /**
     * Id mieszkania związanego z meldunkiem.
     */
    private Long mieszkanieId;

    /**
     * Numer mieszkania.
     */
    private Integer numerMieszkania;

    /**
     * Imię osoby związanej z meldunkiem.
     */
    private String imie;

    /**
     * Nazwisko osoby związanej z meldunkiem.
     */
    private String nazwisko;

    /**
     * Data meldunku.
     */
    private Date dataMeldunku;

    /**
     * Data wymeldowania.
     */
    private Date dataWymeldowania;

    /**
     * Informacja o wynajmującym.
     */
    private Boolean wynajmujacy;

}
