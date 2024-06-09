package com.s13tab.budynkibackend.model;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @Column(name = "zadanie_id", nullable = false)
    private Long id;

    @Column(name = "koszt", scale = 2, precision = 10, nullable = false)
    private BigDecimal koszt;

    @Column(name = "opis", length = 65535)
    private String opis;

    @Column(name = "data_rozpoczecia", nullable = false)
    private Date dataRozpoczecia;

    @Column(name = "data_zakonczenia")
    private Date dataZakonczenia;

    @ManyToOne
    @JoinColumn(name = "firma_podwykonawcza_id")
    private Firma firma;

    @ManyToOne
    @JoinColumn(name = "zgloszenie_id", nullable = false)
    private Zgloszenie zgloszenie;

    @OneToMany(mappedBy = "zadanie")
    private List<Platnosc> platnosci;

}
