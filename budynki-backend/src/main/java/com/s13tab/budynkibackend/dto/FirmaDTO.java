package com.s13tab.budynkibackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FirmaDTO {

    private Long id;

    private String nazwa;

    private String nip;

    private String ulica;

    private String numerBudynku;

    private String numerLokalu;

    private String kodPocztowy;

    private String miasto;

    // private List<Long> zadaniaId;

}
