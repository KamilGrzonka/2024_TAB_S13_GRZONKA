package com.s13tab.budynkibackend.model;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
@Table(name = "cennik")
public class Cennik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cennik_id", nullable = false)
    private Long id;

    @Column(name = "data_poczatkowa", nullable = false)
    private Date dataPoczatkowa;

    @Column(name = "data_koncowa", nullable = false)
    private Date dataKoncowa;

    @Column(name = "cena", scale = 2, precision = 10, nullable = false)
    private BigDecimal cena;

    @ManyToOne
    @JoinColumn(name = "mieszkanie_id", nullable = false)
    private Mieszkanie mieszkanie;

}
