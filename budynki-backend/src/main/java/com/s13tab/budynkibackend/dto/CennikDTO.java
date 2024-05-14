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
public class CennikDTO {

    private Long id;

    private Date dataPoczatkowa;

    private Date dataKoncowa;

    private BigDecimal cena;

    private Long mieszkanieId;

}
