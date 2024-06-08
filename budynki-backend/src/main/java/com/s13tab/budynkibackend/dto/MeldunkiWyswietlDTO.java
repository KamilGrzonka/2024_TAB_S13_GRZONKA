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
    Long meldunekId;
    Long osobaId;
    Long mieszkanieId;
    Integer numerMieszkania;
    String imie;
    String nazwisko;
    Date dataMeldunku;
    Date dataWymeldowania;
    Boolean wynajmujacy;
}
