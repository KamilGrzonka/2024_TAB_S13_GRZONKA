package com.s13tab.budynkibackend.dto;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
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

    @NotNull(message = "Data meldunku nie może być pusta")
    private Date dataMeldunku;

    private Date dataWymeldowania;

    @NotNull(message = "Pole wynajmujący nie może być puste")
    private Boolean wynajmujacy;

    @NotNull(message = "Id osoby nie może być puste")
    @PositiveOrZero(message = "Id osoby nie może być ujemne")
    private Long osobaId;

    @NotNull(message = "Id mieszkania nie może być puste")
    @PositiveOrZero(message = "Id mieszkania nie może być ujemne")
    private Long mieszkanieId;

}
