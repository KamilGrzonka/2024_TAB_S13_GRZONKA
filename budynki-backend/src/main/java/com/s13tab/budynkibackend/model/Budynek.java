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
    @Column(name = "numer_budynku")
    private Integer numberBudynku;

    @Column(name="adres", length = 150, nullable = false)
    private String adres;

    @Column(name="liczba_miejsc", nullable = false)
    private Integer liczbaMiejsc;

    @OneToMany(mappedBy="budynek")
    private List<Mieszkanie> mieszkania;
}
