package com.s13tab.budynkibackend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Klasa DTO (Data Transfer Object) reprezentująca dane mieszkania.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MieszkanieDTO {

    /**
     * Identyfikator mieszkania.
     */
    private Long id;

    /**
     * Numer mieszkania.
     */
    @Positive(message = "Liczba musi być dodatnia")
    private Integer numerMieszkania;

    /**
     * Numer piętra, na którym znajduje się mieszkanie.
     */
    @PositiveOrZero(message = "Liczba nie może być ujemna")
    private Short pietro;

    /**
     * Liczba mieszkańców w mieszkaniu.
     */
    @PositiveOrZero(message = "Liczba nie może być ujemna")
    private Short liczbaMieszkancow;

    /**
     * Opis mieszkania.
     */
    @Size(max = 65535, message = "Długość opisu nie może przekroczyć 65535 znaków")
    private String opis;

    /**
     * Id budynku, do którego należy mieszkanie.
     */
    @NotNull(message = "Id budynku nie może być puste")
    @PositiveOrZero(message = "Id budynku nie może być ujemne")
    private Long budynekId;

}
