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
public class ZaleglaPlatnoscDTO {
    private Long budynekId;
    private BigDecimal wartosc;
    private Integer miesiaceOpoznienia;

    private Long mieszkanieId;
    private Long meldunekId;

    private Long zgloszenieId;
    private Long zadanieId;
}
