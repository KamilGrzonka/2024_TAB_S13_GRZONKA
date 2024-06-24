package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca zaległą płatność.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZaleglaPlatnoscDTO {

    /**
     * Identyfikator budynku, do którego należy zaległa płatność.
     */
    private Long budynekId;

    /**
     * Wartość zaległej płatności.
     */
    private BigDecimal wartosc;

    /**
     * Liczba miesięcy opóźnienia zaległej płatności.
     */
    private Integer miesiaceOpoznienia;

    /**
     * Identyfikator mieszkania, do którego należy zaległa płatność.
     */
    private Long mieszkanieId;

    /**
     * Identyfikator meldunku, z którego wynika zaległa płatność.
     */
    private Long meldunekId;

    /**
     * Identyfikator zgłoszenia, z którego wynika zaległa płatność.
     */
    private Long zgloszenieId;

    /**
     * Identyfikator zadania, z którego wynika zaległa płatność.
     */
    private Long zadanieId;
}
