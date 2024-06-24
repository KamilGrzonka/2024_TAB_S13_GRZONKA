package com.s13tab.budynkibackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Encja reprezentująca mieszkanie.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "mieszkanie")
public class Mieszkanie {

    /**
     * Identyfikator mieszkania.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mieszkanie_id", nullable = false)
    private Long id;

    /**
     * Numer mieszkania.
     */
    @Column(name = "numer_mieszkania", nullable = false)
    private Integer numerMieszkania;

    /**
     * Piętro, na którym znajduje się mieszkanie.
     */
    @Column(name = "pietro", nullable = false)
    private Short pietro;

    /**
     * Liczba mieszkańców w mieszkaniu.
     */
    @Column(name = "liczba_mieszkancow", nullable = false)
    private Short liczbaMieszkancow;

    /**
     * Dodatkowy opis mieszkania.
     */
    @Column(name = "opis", length = 65535)
    private String opis;

    /**
     * Budynek, w którym znajduje się mieszkanie.
     */
    @ManyToOne
    @JoinColumn(name = "budynek_id", nullable = false)
    private Budynek budynek;

    /**
     * Lista meldunków przypisanych do tego mieszkania.
     */
    @OneToMany(mappedBy = "mieszkanie")
    private List<Meldunek> meldunki;

    /**
     * Lista cenników przypisanych do tego mieszkania.
     */
    @OneToMany(mappedBy = "mieszkanie")
    private List<Cennik> cenniki;

    /**
     * Lista zgłoszeń przypisanych do tego mieszkania.
     */
    @OneToMany(mappedBy = "mieszkanie")
    private List<Zgloszenie> zgloszenia;

}
