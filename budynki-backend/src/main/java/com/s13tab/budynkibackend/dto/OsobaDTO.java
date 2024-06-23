package com.s13tab.budynkibackend.dto;

import com.s13tab.budynkibackend.utility.Constants;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @NotNull(message = "PESEL nie może być pusty")
    @Pattern(regexp = "^\\d{11}$", message = "PESEL musi składać się z 11 cyfr")
    private String pesel;

    @NotNull(message = "Imię nie może być puste")
    @Size(max = 40, message = "Imię może mieć maksymalnie 40 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS +" -]+$", message = "Wprowadź poprawne imię")
    private String imie;

    @NotNull(message = "Nazwisko nie może być puste")
    @Size(max = 40, message = "Nazwisko może mieć maksymalnie 40 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS +" -]+$", message = "Wprowadź poprawne nazwisko")
    private String nazwisko;

    // private List<Long> meldunkiId;

    // private List<Long> umowyId;

    // private List<Long> zgloszeniaId;

}
