package com.s13tab.budynkibackend.dto;

import com.s13tab.budynkibackend.utility.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane firmy podwykonawczej.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FirmaDTO {

    /**
     * Identyfikator firmy.
     */
    private Long id;

    /**
     * Nazwa firmy.
     */
    @NotBlank(message = "Pole nazwa nie może być puste")
    @Size(max = 100, message = "Nazwa musi mieć maksymalnie 100 znaków")
    private String nazwa;

    /**
     * Numer identyfikacji podatkowej (NIP) firmy.
     */
    @Pattern(regexp = "^\\d{10}$", message = "NIP musi składać się z 10 cyfr")
    private String nip;

    /**
     * Ulica, na której znajduje się firma.
     */
    @NotBlank(message = "Pole ulica nie może być puste")
    @Size(max = 80, message = "Ulica musi mieć maksymalnie 80 znaków")
    private String ulica;

    /**
     * Numer budynku, gdzie znajduje się firma.
     */
    @NotBlank(message = "Pole numer budynku nie może być puste")
    @Size(max = 5, message = "Numer budynku nie może mieć więcej niż 5 znaków")
    @Pattern(regexp = "^\\d+[" + Constants.POLISH_CHARS + "]?$", message = "Wprowadź poprawny numer budynku")
    private String numerBudynku;

    /**
     * Numer lokalu, gdzie znajduje się firma.
     */
    @Size(max = 5, message = "Numer lokalu nie może mieć więcej niż 5 znaków")
    @Pattern(regexp = "^\\d+[" + Constants.POLISH_CHARS + "]?$", message = "Wprowadź poprawny numer lokalu")
    private String numerLokalu;

    /**
     * Kod pocztowy miejsca, gdzie znajduje się firma.
     */
    @NotBlank(message = "Pole kod pocztowy nie może być puste")
    @Pattern(regexp = "^\\d{2}-\\d{3}$", message = "Wprowadź poprawny kod pocztowy")
    private String kodPocztowy;

    /**
     * Miasto, gdzie znajduje się firma.
     */
    @NotBlank(message = "Pole miasto nie może być puste")
    @Size(min = 1, max = 80, message = "Miasto musi mieć od 1 do 80 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS + " -]+$", message = "Wprowadź poprawne miasto")
    private String miasto;

}
