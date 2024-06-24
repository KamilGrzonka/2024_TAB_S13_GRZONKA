package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.OsobaDTO;
import com.s13tab.budynkibackend.model.Osoba;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Osoba} a DTO {@link OsobaDTO}.
 */
@RequiredArgsConstructor
@Component
public class OsobaMapper {

    /**
     * Konwertuje encję {@link Osoba} na DTO {@link OsobaDTO}.
     *
     * @param osoba encja {@link Osoba} do konwersji
     * @return odpowiadające DTO {@link OsobaDTO}
     */
    public OsobaDTO convertToDTO(Osoba osoba) {
        return new OsobaDTO(osoba.getId(), osoba.getPesel(), osoba.getImie(), osoba.getNazwisko()
                );
    }

    /**
     * Konwertuje DTO {@link OsobaDTO} na encję {@link Osoba}.
     *
     * @param osobaDTO DTO {@link OsobaDTO} do konwersji
     * @return odpowiadająca encja {@link Osoba}
     */
    public Osoba convertToEntity(OsobaDTO osobaDTO) {
        return new Osoba(osobaDTO.getId(), osobaDTO.getPesel(), osobaDTO.getImie(), osobaDTO.getNazwisko(),
                null, null
                );
    }

    /**
     * Konwertuje listę encji {@link Osoba} na listę DTO {@link OsobaDTO}.
     *
     * @param osoby lista encji {@link Osoba} do konwersji
     * @return odpowiadająca lista DTO {@link OsobaDTO}
     */
    public List<OsobaDTO> convertToDTO(List<Osoba> osoby) {
        return osoby.stream().map(osoba -> convertToDTO(osoba)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link OsobaDTO} na listę encji {@link Osoba}.
     *
     * @param osobyDTO lista DTO {@link OsobaDTO} do konwersji
     * @return odpowiadająca lista encji {@link Osoba}
     */
    public List<Osoba> convertToEntity(List<OsobaDTO> osobyDTO) {
        return osobyDTO.stream().map(osobaDTO -> convertToEntity(osobaDTO)).collect(Collectors.toList());
    }

}
