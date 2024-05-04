package com.s13tab.budynkibackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
}
