package com.s13tab.budynkibackend.model;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Encja reprezentująca osobę.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "osoba")
public class Osoba {

    /**
     * Identyfikator osoby.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "osoba_id", nullable = false)
    private Long id;

    /**
     * Numer PESEL osoby.
     */
    @Column(name = "pesel", length = 11, nullable = false, unique = true)
    private String pesel;

    /**
     * Imię osoby.
     */
    @Column(name = "imie", length = 40, nullable = false)
    private String imie;

    /**
     * Nazwisko osoby.
     */
    @Column(name = "nazwisko", length = 40, nullable = false)
    private String nazwisko;

    /**
     * Lista meldunków przypisanych do tej osoby.
     */
    @OneToMany(mappedBy = "osoba")
    private List<Meldunek> meldunki;

    /**
     * Lista zgłoszeń przypisanych do tej osoby.
     */
    @OneToMany(mappedBy = "osoba")
    private List<Zgloszenie> zgloszenia;

}
