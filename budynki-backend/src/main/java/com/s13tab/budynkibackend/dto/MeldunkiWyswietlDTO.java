package com.s13tab.budynkibackend.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeldunkiWyswietlDTO {
    private Long meldunekId;
    private Long osobaId;
    private Long mieszkanieId;
    private Integer numerMieszkania;
    private String imie;
    private String nazwisko;
    private Date dataMeldunku;
    private Date dataWymeldowania;
    private Boolean wynajmujacy;
}
