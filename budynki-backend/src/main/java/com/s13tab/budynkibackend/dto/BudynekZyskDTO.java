package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane zysku związane z budynkiem.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudynekZyskDTO {

    /**
     * Identyfikator budynku.
     */
    private Long budynekId;

    /**
     * Ulica, na której znajduje się budynek.
     */
    private String ulica;

    /**
     * Numer budynku.
     */
    private String numerBudynku;

    /**
     * Kod pocztowy budynku.
     */
    private String kodPocztowy;

    /**
     * Miasto, w którym znajduje się budynek.
     */
    private String miasto;

    /**
     * Wartość zysku związana z budynkiem.
     */
    private BigDecimal wartosc;

}
