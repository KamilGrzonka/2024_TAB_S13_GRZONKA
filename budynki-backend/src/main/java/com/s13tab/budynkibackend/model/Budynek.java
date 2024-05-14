package com.s13tab.budynkibackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "budynek")
public class Budynek {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budynek_id", nullable = false)
    private Long id;

    @Column(name = "ulica", length = 80, nullable = false)
    private String ulica;

    @Column(name = "numer_budynku", length = 5, nullable = false)
    private String numerBudynku;

    @Column(name = "kod_pocztowy", length = 6, nullable = false)
    private String kodPocztowy;

    @Column(name = "miasto", length = 80, nullable = false)
    private String miasto;

    @Column(name = "liczba_miejsc", nullable = false)
    private Integer liczbaMiejsc;

    @OneToMany(mappedBy = "budynek")
    private List<Mieszkanie> mieszkania;

    @OneToMany(mappedBy = "budynek")
    private List<Zgloszenie> zgloszenia;

}
