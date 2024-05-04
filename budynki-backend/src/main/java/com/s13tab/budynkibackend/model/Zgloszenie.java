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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "zgloszenie")
public class Zgloszenie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numer_zgloszenia", nullable = false)
    private Integer numerZgloszenia;

    @Column(name = "data_zgloszenia", nullable = false)
    private Date dataZgloszenia;

    @Column(name = "data_wykonania", nullable = false)
    private Date dataWykonania;

    @Column(name = "status_zgloszenia", scale = 1, nullable = false)
    private BigDecimal statusZgloszenia;

    @Column(name = "typ_zgloszenia", scale = 1, nullable = false)
    private BigDecimal typZgloszenia;

    @Column(name = "koszt_calkowity", scale = 10, precision = 2, nullable = false)
    private BigDecimal kosztCalkowity;

    @Column(name = "priorytet", nullable = false)
    private Short priorytet;

    @ManyToOne
    @JoinColumn(name = "meldunek_numer_meldunku")
    private Meldunek meldunek;

    @ManyToOne
    @JoinColumn(name = "mieszkanie_numer_mieszkania")
    private Mieszkanie mieszkanie;

    @ManyToOne
    @JoinColumn(name = "budynek_numer_budynku")
    private Budynek budynek;
}
