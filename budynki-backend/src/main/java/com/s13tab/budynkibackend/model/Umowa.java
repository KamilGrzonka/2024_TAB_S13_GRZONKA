package com.s13tab.budynkibackend.model;

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
@Table(name = "umowa")
public class Umowa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "umowa_id", nullable = false)
    private Long id;

    @Column(name = "data_zawarcia", nullable = false)
    private Date dataZawarcia;

    @ManyToOne
    @JoinColumn(name = "osoba_id", nullable = false)
    private Osoba osoba;

    @ManyToOne
    @JoinColumn(name = "cennik_id", nullable = false)
    private Cennik cennik;

}
