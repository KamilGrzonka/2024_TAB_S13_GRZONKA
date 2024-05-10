package com.s13tab.budynkibackend.model.dto;

import java.math.BigDecimal;

public record OsobaDto(BigDecimal pesel, String imieINazwisko, Boolean najmujacy) {
    
}
