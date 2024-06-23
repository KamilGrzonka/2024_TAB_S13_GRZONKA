package com.s13tab.budynkibackend.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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
public class MieszkanieDTO {

    private Long id;

    @Positive(message = "Liczba musi być dodatnia")
    private Integer numerMieszkania;

    @PositiveOrZero(message = "Liczba nie może być ujemna")
    private Short pietro;

    @PositiveOrZero(message = "Liczba nie może być ujemna")
    private Short liczbaMieszkancow;

    @Size(max = 65535, message = "Długość opisu nie może przekroczyć 65535 znaków")
    private String opis;

    @NotNull(message = "Id budynku nie może być puste")
    @PositiveOrZero(message = "Id budynku nie może być ujemne")
    private Long budynekId;

    // private List<Long> meldunkiId;

    // private List<Long> cennikiId;

    // private List<Long> zgloszeniaId;

}
