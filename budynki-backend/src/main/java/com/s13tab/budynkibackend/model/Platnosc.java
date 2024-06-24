package com.s13tab.budynkibackend.model;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Encja reprezentująca płatność.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "platnosc")
public class Platnosc {

    /**
     * Identyfikator płatności.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "platnosc_id", nullable = false)
    private Long id;

    /**
     * Data zrealizowania płatności.
     */
    @Column(name = "data_zrealizowania", nullable = false)
    private Date dataZrealizowania;

    /**
     * Wartość płatności.
     */
    @Column(name = "wartosc", scale = 2, precision = 10, nullable = false)
    private BigDecimal wartosc;

    /**
     * Zadanie powiązane z płatnością.
     */
    @ManyToOne
    @JoinColumn(name = "zadanie_id")
    private Zadanie zadanie;

    /**
     * Meldunek powiązany z płatnością.
     */
    @ManyToOne
    @JoinColumn(name = "meldunek_id")
    private Meldunek meldunek;

}
