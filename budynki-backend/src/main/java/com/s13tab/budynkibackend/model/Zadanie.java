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
@Table(name = "zadanie")
public class Zadanie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "numer_zadania", nullable = false)
    private Integer numerZadania;

    @Column(name = "koszt", scale = 10, precision = 2, nullable = false)
    private BigDecimal koszt;

    @Column(name = "opis", length = 65535, nullable = false)
    private String opis;

    @Column(name = "data_rozpoczecia", nullable = false)
    private Date dataRozpoczecia;

    @Column(name = "data_zakonczenia", nullable = false)
    private Date dataZakonczenia;

    @ManyToOne
    @JoinColumn(name = "firma_podwykonawcza_nip")
    private Firma firmaPodwykonawcza;

    @ManyToOne
    @JoinColumn(name = "zgloszenie_numer_zgloszenia", nullable = false)
    private Zgloszenie zgloszenie;
}
