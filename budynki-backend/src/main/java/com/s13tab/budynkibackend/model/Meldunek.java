package com.s13tab.budynkibackend.model;

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

/**
 * Encja reprezentująca meldunek.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meldunek")
public class Meldunek {

    /**
     * Identyfikator meldunku.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meldunek_id", nullable = false)
    private Long id;

    /**
     * Data dokonania meldunku.
     */
    @Column(name = "data_meldunku", nullable = false)
    private Date dataMeldunku;

    /**
     * Data dokonania wymeldowania, opcjonalna.
     */
    @Column(name = "data_wymeldowania")
    private Date dataWymeldowania;

    /**
     * Flaga określająca, czy osoba jest wynajmującym.
     */
    @Column(name = "wynajmujacy", nullable = false)
    private boolean wynajmujacy;

    /**
     * Osoba, dla której dokonano meldunku.
     */
    @ManyToOne
    @JoinColumn(name = "osoba_id", nullable = false)
    private Osoba osoba;

    /**
     * Mieszkanie, w którym dokonano meldunku.
     */
    @ManyToOne
    @JoinColumn(name = "mieszkanie_id", nullable = false)
    private Mieszkanie mieszkanie;

    /**
     * Lista płatności związanych z tym meldunkiem.
     */
    @OneToMany(mappedBy = "meldunek")
    private List<Platnosc> platnosci;

}
