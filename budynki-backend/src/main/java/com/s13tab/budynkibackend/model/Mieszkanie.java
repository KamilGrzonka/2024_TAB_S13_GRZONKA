package com.s13tab.budynkibackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mieszkanie")
public class Mieszkanie {
    @Id
    @Column(name = "numer_mieszkania", nullable = false)
    private Integer numerMieszkania;

    @Column(name = "pietro", nullable = false)
    private Short pietro;

    @Column(name = "liczba_osob", nullable = false)
    private Short liczbaOsob;

    @Column(name = "opis", length = 65535, nullable = false)
    private String opis;

    @ManyToOne
    @JoinColumn(name = "budynek_numer_budynku")
    private Budynek budynek;

    @OneToMany(mappedBy = "mieszkanie")
    private List<Meldunek> meldunki;

}
