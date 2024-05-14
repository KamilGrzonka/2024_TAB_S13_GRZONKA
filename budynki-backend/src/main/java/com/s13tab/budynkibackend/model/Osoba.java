package com.s13tab.budynkibackend.model;

import java.util.List;

import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "osoba_id", nullable = false)
    private Long id;

    @Column(name = "pesel", length = 11, nullable = false, unique = true)
    private String pesel;

    @Column(name = "imie", length = 40, nullable = false)
    private String imie;

    @Column(name = "nazwisko", length = 40, nullable = false)
    private String nazwisko;

    @OneToMany(mappedBy = "osoba")
    private List<Meldunek> meldunki;

    @OneToMany(mappedBy = "osoba")
    private List<Umowa> umowy;

}
