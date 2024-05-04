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
@Table(name = "platnosc")
public class Platnosc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numer_platnosci", nullable = false)
    private Integer numerPlatnosci;

    @Column(name = "data_naliczenia", nullable = false)
    private Date dataNaliczenia;

    @Column(name = "data_zrealizowania", nullable = false)
    private Date dataZrealizowania;

    @Column(name = "zrealizowana", nullable = false)
    private Boolean zrealizowana;

    @Column(name = "naleznosc", scale = 10, precision = 2, nullable = false)
    private BigDecimal naleznosc;

    @ManyToOne
    @JoinColumn(name = "zadanie_numer_zadania")
    private Zadanie zadanie;

    @ManyToOne
    @JoinColumn(name = "umowa_numer_umowy")
    private Umowa umowa;
}
