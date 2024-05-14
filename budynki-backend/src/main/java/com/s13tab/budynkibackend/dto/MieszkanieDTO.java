package com.s13tab.budynkibackend.dto;

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

    private Integer numerMieszkania;

    private Short pietro;

    private Short liczbaMieszkancow;

    private String opis;

    private Long budynekId;

    // private List<Long> meldunkiId;

    // private List<Long> cennikiId;

    // private List<Long> zgloszeniaId;

}
