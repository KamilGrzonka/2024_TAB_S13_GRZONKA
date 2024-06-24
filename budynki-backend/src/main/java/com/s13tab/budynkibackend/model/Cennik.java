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
 * Encja reprezentująca cennik.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cennik")
public class Cennik {

    /**
     * Identyfikator cennika.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cennik_id", nullable = false)
    private Long id;

    /**
     * Data rozpoczęcia obowiązywania cennika.
     */
    @Column(name = "data_poczatkowa", nullable = false)
    private Date dataPoczatkowa;

    /**
     * Data zakończenia obowiązywania cennika.
     */
    @Column(name = "data_koncowa", nullable = false)
    private Date dataKoncowa;

    /**
     * Cena jednostkowa za usługę lub produkt.
     */
    @Column(name = "cena", scale = 2, precision = 10, nullable = false)
    private BigDecimal cena;

    /**
     * Mieszkanie, dla którego jest ustalony ten cennik.
     */
    @ManyToOne
    @JoinColumn(name = "mieszkanie_id", nullable = false)
    private Mieszkanie mieszkanie;

}
