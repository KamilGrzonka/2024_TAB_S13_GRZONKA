package com.s13tab.budynkibackend.model.dto;

import java.math.BigDecimal;
import java.sql.Date;

public record MeldunekDto(Integer numerMeldunku,
                          Date dataMeldunku,
                          Date dataWymeldowania,
                          Boolean statusMeldunku,
                          BigDecimal osobaPesel,
                          Integer numerMieszkania) {
}
