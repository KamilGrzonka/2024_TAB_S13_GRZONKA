package com.s13tab.budynkibackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OsobaDTO {

    private Long id;

    private String pesel;

    private String imie;

    private String nazwisko;

    // private List<Long> meldunkiId;

    // private List<Long> umowyId;

}
