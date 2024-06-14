package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudynekZyskDTO {
    private Long budynekId;
    private String ulica;
    private String numerBudynku;
    private String kodPocztowy;
    private String miasto;
    private BigDecimal wartosc;
}
