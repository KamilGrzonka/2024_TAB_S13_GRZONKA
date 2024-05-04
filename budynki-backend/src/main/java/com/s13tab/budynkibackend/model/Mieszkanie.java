package com.s13tab.budynkibackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    @JoinColumn(name = "budynek_numer_budynku", nullable = false)
    private Budynek budynek;
}
