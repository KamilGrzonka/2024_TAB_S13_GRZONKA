package com.s13tab.budynkibackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Encja reprezentująca budynek.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "budynek")
public class Budynek {

    /**
     * Identyfikator budynku.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budynek_id", nullable = false)
    private Long id;

    /**
     * Ulica, na której znajduje się budynek.
     */
    @Column(name = "ulica", length = 80, nullable = false)
    private String ulica;

    /**
     * Numer budynku.
     */
    @Column(name = "numer_budynku", length = 5, nullable = false)
    private String numerBudynku;

    /**
     * Kod pocztowy budynku.
     */
    @Column(name = "kod_pocztowy", length = 6, nullable = false)
    private String kodPocztowy;

    /**
     * Miasto, w którym znajduje się budynek.
     */
    @Column(name = "miasto", length = 80, nullable = false)
    private String miasto;

    /**
     * Liczba miejsc w budynku.
     */
    @Column(name = "liczba_miejsc", nullable = false)
    private Integer liczbaMiejsc;

    /**
     * Lista mieszkań przypisanych do tego budynku.
     */
    @OneToMany(mappedBy = "budynek")
    private List<Mieszkanie> mieszkania;

    /**
     * Lista zgłoszeń przypisanych do tego budynku.
     */
    @OneToMany(mappedBy = "budynek")
    private List<Zgloszenie> zgloszenia;

}
