package com.s13tab.budynkibackend.controller.dto;

import java.sql.Date;

public record MeldunekPutDto(Integer numerMeldunku,
                             Date dataMeldunku,
                             Date dataWymeldowania,
                             Boolean statusMeldunku,
                             String osobaPesel,
                             Integer numerMieszkania) {
}
