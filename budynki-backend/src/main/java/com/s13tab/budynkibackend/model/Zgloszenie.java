package com.s13tab.budynkibackend.model;

import java.sql.Date;
import java.util.List;

import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.enums.Typ;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
 * Encja reprezentująca zgłoszenie.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "zgloszenie")
public class Zgloszenie {

    /**
     * Identyfikator zgłoszenia.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zgloszenie_id", nullable = false)
    private Long id;

    /**
     * Data zgłoszenia.
     */
    @Column(name = "data_zgloszenia", nullable = false)
    private Date dataZgloszenia;

    /**
     * Status zgłoszenia.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "status_zgloszenia", nullable = false)
    private Status statusZgloszenia;

    /**
     * Typ zgłoszenia.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "typ_zgloszenia", nullable = false)
    private Typ typZgloszenia;

    /**
     * Priorytet zgłoszenia.
     */
    @Column(name = "priorytet", nullable = false)
    private Short priorytet;

    /**
     * Opis zgłoszenia.
     */
    @Column(name = "opis", length = 65535)
    private String opis;

    /**
     * Osoba zgłaszająca zgłoszenie.
     */
    @ManyToOne
    @JoinColumn(name = "osoba_id")
    private Osoba osoba;

    /**
     * Mieszkanie, do którego przypisane jest zgłoszenie.
     */
    @ManyToOne
    @JoinColumn(name = "mieszkanie_id")
    private Mieszkanie mieszkanie;

    /**
     * Budynek, do którego przypisane jest zgłoszenie.
     */
    @ManyToOne
    @JoinColumn(name = "budynek_id", nullable = false)
    private Budynek budynek;

    /**
     * Lista zadań powiązanych z zgłoszeniem.
     */
    @OneToMany(mappedBy = "zgloszenie")
    private List<Zadanie> zadania;

}
