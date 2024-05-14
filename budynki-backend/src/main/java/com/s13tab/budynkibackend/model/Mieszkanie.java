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
@Table(name = "mieszkanie")
public class Mieszkanie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mieszkanie_id", nullable = false)
    private Long id;

    @Column(name = "numer_mieszkania", nullable = false)
    private Integer numerMieszkania;

    @Column(name = "pietro", nullable = false)
    private Short pietro;

    @Column(name = "liczba_mieszkancow", nullable = false)
    private Short liczbaMieszkancow;

    @Column(name = "opis", length = 65535)
    private String opis;

    @ManyToOne
    @JoinColumn(name = "budynek_id", nullable = false)
    private Budynek budynek;

    @OneToMany(mappedBy = "mieszkanie")
    private List<Meldunek> meldunki;

    @OneToMany(mappedBy = "mieszkanie")
    private List<Cennik> cenniki;

    @OneToMany(mappedBy = "mieszkanie")
    private List<Zgloszenie> zgloszenia;

}
