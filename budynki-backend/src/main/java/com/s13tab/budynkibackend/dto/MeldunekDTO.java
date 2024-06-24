package com.s13tab.budynkibackend.dto;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane meldunku.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeldunekDTO {

    /**
     * Identyfikator meldunku.
     */
    private Long id;

    /**
     * Data meldunku.
     */
    @NotNull(message = "Data meldunku nie może być pusta")
    private Date dataMeldunku;

    /**
     * Data wymeldowania (opcjonalna).
     */
    private Date dataWymeldowania;

    /**
     * Informacja o wynajmującym.
     */
    @NotNull(message = "Pole wynajmujący nie może być puste")
    private Boolean wynajmujacy;

    /**
     * Id osoby związanej z meldunkiem.
     */
    @NotNull(message = "Id osoby nie może być puste")
    @PositiveOrZero(message = "Id osoby nie może być ujemne")
    private Long osobaId;

    /**
     * Id mieszkania związanego z meldunkiem.
     */
    @NotNull(message = "Id mieszkania nie może być puste")
    @PositiveOrZero(message = "Id mieszkania nie może być ujemne")
    private Long mieszkanieId;

}
