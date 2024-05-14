package com.s13tab.budynkibackend.dto;

import java.math.BigDecimal;
import java.sql.Date;

import com.s13tab.budynkibackend.enums.Status;
import com.s13tab.budynkibackend.enums.Typ;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ZgloszenieDTO {

    private Long id;

    private Date dataZgloszenia;

    private Date dataWykonania;

    private Status statusZgloszenia;

    private Typ typZgloszenia;

    private BigDecimal kosztCalkowity;

    private Short priorytet;

    private Long meldunekId;

    private Long mieszkanieId;

    private Long budynekId;

    // private List<Long> zadaniaId;

}
