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
public class ZgloszeniaWyswietlDTO {
    private Long zgloszenieid;
    private Long osobaId;
    private Long mieszkanieId;
    private Long budynekId;
    private Integer numerMieszkania;
    private String imie;
    private String nazwisko;
    private Date dataZgloszenia;
    private Status statusZgloszenia;
    private Typ typZgloszenia;
    private Short priorytet;
    private String opis;
    private Date dataWykonania;
    private BigDecimal kosztCalkowity;
}
