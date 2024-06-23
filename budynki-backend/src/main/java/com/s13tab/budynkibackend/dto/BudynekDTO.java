package com.s13tab.budynkibackend.dto;

import com.s13tab.budynkibackend.utility.Constants;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BudynekDTO {

    private Long id;

    @NotBlank(message = "Pole ulica nie może być puste")
    @Size(min = 1, max = 80, message = "Ulica musi mieć od 1 do 80 znaków")
    private String ulica;

    @NotBlank(message = "Pole numer budynku nie może być puste")
    @Size(max = 5, message = "Numer budynku nie może mieć więcej niż 5 znaków")
    @Pattern(regexp = "^\\d+[" + Constants.POLISH_CHARS + "]?$", message = "Wprowadź poprawny numer budynku")
    private String numerBudynku;

    @NotBlank(message = "Pole kod pocztowy nie może być puste")
    @Size(min = 6, max = 6, message = "Kod pocztowy musi mieć 6 znaków")
    @Pattern(regexp = "^\\d{2}-\\d{3}$", message = "Wprowadź poprawny kod pocztowy")
    private String kodPocztowy;

    @NotBlank(message = "Pole miasto nie może być puste")
    @Size(min = 1, max = 80, message = "Miasto musi mieć od 1 do 80 znaków")
    @Pattern(regexp = "^[" + Constants.POLISH_CHARS + " -]+$", message = "Wprowadź poprawne miasto")
    private String miasto;

    @NotNull(message = "Pole liczba miejsc nie może być puste")
    @PositiveOrZero(message = "Liczba miejsc nie może być ujemna")
    private Integer liczbaMiejsc;

    // private List<Long> mieszkaniaId;

    // private List<Long> zgloszeniaId;

}
