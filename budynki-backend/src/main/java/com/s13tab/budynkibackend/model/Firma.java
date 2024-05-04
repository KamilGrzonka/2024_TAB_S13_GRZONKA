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
@Table(name = "firma_podwykonawcza")
public class Firma {
    @Id
    @Column(name = "nip", scale = 10, nullable = false)
    private BigDecimal nip;

    @Column(name = "adres", length = 150, nullable = false)
    private String adres;

    @Column(name = "nazwa", length = 100, nullable = false)
    private String nazwa;
}
