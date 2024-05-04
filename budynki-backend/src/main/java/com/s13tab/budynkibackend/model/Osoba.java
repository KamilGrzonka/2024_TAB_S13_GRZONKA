package com.s13tab.budynkibackend.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "osoba")
public class Osoba {
    @Id
    @Column(name = "pesel", scale = 11, nullable = false)
    private BigDecimal pesel;

    @Column(name = "imie_i_nazwisko", nullable = false)
    private String imieINazwisko;

    @Column(name = "najmujacy", nullable = false)
    private Boolean najmujacy;
}
