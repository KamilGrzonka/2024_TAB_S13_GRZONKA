package com.s13tab.budynkibackend.model;

import java.math.BigDecimal;
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

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "zgloszenie")
public class Zgloszenie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "zgloszenie_id", nullable = false)
    private Long id;

    @Column(name = "data_zgloszenia", nullable = false)
    private Date dataZgloszenia;

    @Column(name = "data_wykonania")
    private Date dataWykonania;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_zgloszenia", nullable = false)
    private Status statusZgloszenia;

    @Enumerated(EnumType.STRING)
    @Column(name = "typ_zgloszenia", nullable = false)
    private Typ typZgloszenia;

    @Column(name = "koszt_calkowity", scale = 2, precision = 10)
    private BigDecimal kosztCalkowity;

    @Column(name = "priorytet", nullable = false)
    private Short priorytet;

    @ManyToOne
    @JoinColumn(name = "meldunek_id")
    private Meldunek meldunek;

    @ManyToOne
    @JoinColumn(name = "mieszkanie_id")
    private Mieszkanie mieszkanie;

    @ManyToOne
    @JoinColumn(name = "budynek_id")
    private Budynek budynek;

    @OneToMany(mappedBy = "zgloszenie")
    private List<Zadanie> zadania;

}
