package com.s13tab.budynkibackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudynekDTO {

    private Long id;

    private String ulica;

    private String numerBudynku;

    private String kodPocztowy;

    private String miasto;

    private Integer liczbaMiejsc;

    // private List<Long> mieszkaniaId;

    // private List<Long> zgloszeniaId;

}
