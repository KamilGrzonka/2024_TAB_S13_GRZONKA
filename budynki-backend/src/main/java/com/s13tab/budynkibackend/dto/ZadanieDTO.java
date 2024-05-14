package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZadanieDTO {

    private Long id;

    private BigDecimal koszt;

    private String opis;

    private Date dataRozpoczecia;

    private Date dataZakonczenia;

    private Long firmaId;

    private Long zgloszenieId;

}
