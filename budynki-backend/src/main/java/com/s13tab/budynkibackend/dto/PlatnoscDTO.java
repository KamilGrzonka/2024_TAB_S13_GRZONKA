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
public class PlatnoscDTO {

    private Long id;

    private Date dataZrealizowania;

    private BigDecimal wartosc;

    private Long zadanieId;

    private Long meldunekId;

}
