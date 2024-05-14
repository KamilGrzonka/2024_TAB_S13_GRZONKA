package com.s13tab.budynkibackend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "firma_podwykonawcza")
public class Firma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "firma_podwykonawcza_id", nullable = false)
    private Long id;

    @Column(name = "nazwa", length = 100, nullable = false)
    private String nazwa;

    @Column(name = "nip", length = 10, nullable = false, unique = true)
    private String nip;

    @Column(name = "ulica", length = 80, nullable = false)
    private String ulica;

    @Column(name = "numer_budynku", length = 5, nullable = false)
    private String numerBudynku;

    @Column(name = "numer_lokalu", length = 5)
    private String numerLokalu;

    @Column(name = "kod_pocztowy", length = 6, nullable = false)
    private String kodPocztowy;

    @Column(name = "miasto", length = 80, nullable = false)
    private String miasto;

    @OneToMany(mappedBy = "firma")
    private List<Zadanie> zadania;

}
