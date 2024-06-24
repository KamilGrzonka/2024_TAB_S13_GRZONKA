package com.s13tab.budynkibackend.dto;

import com.s13tab.budynkibackend.utility.Constants;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane osoby.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OsobaDTO {

    /**
     * Identyfikator osoby.
     */
    private Long id;

    /**
     * Numer PESEL osoby.
     */
    @NotNull(message = "PESEL nie może być pusty")
    @Pattern(regexp = "^\\d{11}$", message = "PESEL musi składać się z 11 cyfr")
    private String pesel;

    /**
     * Imię osoby.
     */
    @NotNull(message = "Imię nie może być puste")
    @Size(max = 40, message = "Imię może mieć maksymalnie 40 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS +" -]+$", message = "Wprowadź poprawne imię")
    private String imie;

    /**
     * Nazwisko osoby.
     */
    @NotNull(message = "Nazwisko nie może być puste")
    @Size(max = 40, message = "Nazwisko może mieć maksymalnie 40 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS +" -]+$", message = "Wprowadź poprawne nazwisko")
    private String nazwisko;

}
