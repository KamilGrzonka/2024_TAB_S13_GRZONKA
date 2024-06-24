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

/**
 * Encja reprezentująca firmę podwykonawczą.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "firma_podwykonawcza")
public class Firma {

    /**
     * Identyfikator firmy podwykonawczej.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "firma_podwykonawcza_id", nullable = false)
    private Long id;

    /**
     * Nazwa firmy podwykonawczej.
     */
    @Column(name = "nazwa", length = 100, nullable = false)
    private String nazwa;

    /**
     * Numer identyfikacji podatkowej (NIP) firmy podwykonawczej.
     */
    @Column(name = "nip", length = 10, nullable = false, unique = true)
    private String nip;

    /**
     * Ulica, na której znajduje się siedziba firmy podwykonawczej.
     */
    @Column(name = "ulica", length = 80, nullable = false)
    private String ulica;

    /**
     * Numer budynku, gdzie mieści się siedziba firmy podwykonawczej.
     */
    @Column(name = "numer_budynku", length = 5, nullable = false)
    private String numerBudynku;

    /**
     * Numer lokalu, gdzie mieści się siedziba firmy podwykonawczej.
     */
    @Column(name = "numer_lokalu", length = 5)
    private String numerLokalu;

    /**
     * Kod pocztowy firmy podwykonawczej.
     */
    @Column(name = "kod_pocztowy", length = 6, nullable = false)
    private String kodPocztowy;

    /**
     * Miasto, gdzie znajduje się siedziba firmy podwykonawczej.
     */
    @Column(name = "miasto", length = 80, nullable = false)
    private String miasto;

    /**
     * Lista zadań powierzonych firmie podwykonawczej do wykonania.
     */
    @OneToMany(mappedBy = "firma")
    private List<Zadanie> zadania;

}
