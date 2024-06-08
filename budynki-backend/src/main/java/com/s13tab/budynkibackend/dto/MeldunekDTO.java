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
public class MeldunekDTO {

    private Long id;

    private Date dataMeldunku;

    private Date dataWymeldowania;

    private Boolean wynajmujacy;

    private Long osobaId;

    private Long mieszkanieId;

}
