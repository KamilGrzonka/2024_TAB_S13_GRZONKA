package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.FirmaDTO;
import com.s13tab.budynkibackend.model.Firma;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Firma} a DTO {@link FirmaDTO}.
 */
@RequiredArgsConstructor
@Component
public class FirmaMapper {

    /**
     * Konwertuje encję {@link Firma} na DTO {@link FirmaDTO}.
     *
     * @param firma encja {@link Firma} do konwersji
     * @return odpowiadające DTO {@link FirmaDTO}
     */
    public FirmaDTO convertToDTO(Firma firma) {
        return new FirmaDTO(firma.getId(), firma.getNazwa(), firma.getNip(), firma.getUlica(),
                firma.getNumerBudynku(), firma.getNumerLokalu(), firma.getKodPocztowy(),
                firma.getMiasto()
                );
    }

    /**
     * Konwertuje DTO {@link FirmaDTO} na encję {@link Firma}.
     *
     * @param firmaDTO DTO {@link FirmaDTO} do konwersji
     * @return odpowiadająca encja {@link Firma}
     */
    public Firma convertToEntity(FirmaDTO firmaDTO) {
        return new Firma(firmaDTO.getId(), firmaDTO.getNazwa(), firmaDTO.getNip(),
                firmaDTO.getUlica(), firmaDTO.getNumerBudynku(), firmaDTO.getNumerLokalu(),
                firmaDTO.getKodPocztowy(),
                firmaDTO.getMiasto(),
                null
                );
    }

    /**
     * Konwertuje listę encji {@link Firma} na listę DTO {@link FirmaDTO}.
     *
     * @param firmy lista encji {@link Firma} do konwersji
     * @return odpowiadająca lista DTO {@link FirmaDTO}
     */
    public List<FirmaDTO> convertToDTO(List<Firma> firmy) {
        return firmy.stream().map(firma -> convertToDTO(firma)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link FirmaDTO} na listę encji {@link Firma}.
     *
     * @param firmyDTO lista DTO {@link FirmaDTO} do konwersji
     * @return odpowiadająca lista encji {@link Firma}
     */
    public List<Firma> convertToEntity(List<FirmaDTO> firmyDTO) {
        return firmyDTO.stream().map(firmaDTO -> convertToEntity(firmaDTO)).collect(Collectors.toList());
    }

}
