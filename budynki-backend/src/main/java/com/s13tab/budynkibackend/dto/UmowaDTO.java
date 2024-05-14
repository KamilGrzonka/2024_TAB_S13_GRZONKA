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
public class UmowaDTO {

    private Long id;

    private Date dataZawarcia;

    private Long osobaId;

    private Long cennikId;

}
