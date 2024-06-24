package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.BudynekDTO;
import com.s13tab.budynkibackend.model.Budynek;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Budynek} a DTO {@link BudynekDTO}.
 */
@RequiredArgsConstructor
@Component
public class BudynekMapper {

    /**
     * Konwertuje encję {@link Budynek} na DTO {@link BudynekDTO}.
     *
     * @param budynek encja {@link Budynek} do konwersji
     * @return odpowiadające DTO {@link BudynekDTO}
     */
    public BudynekDTO convertToDTO(Budynek budynek) {
        return new BudynekDTO(budynek.getId(), budynek.getUlica(), budynek.getNumerBudynku(),
                budynek.getKodPocztowy(), budynek.getMiasto(), budynek.getLiczbaMiejsc()
                );
    }

    /**
     * Konwertuje DTO {@link BudynekDTO} na encję {@link Budynek}.
     *
     * @param budynekDTO DTO {@link BudynekDTO} do konwersji
     * @return odpowiadająca encja {@link Budynek}
     */
    public Budynek convertToEntity(BudynekDTO budynekDTO) {
        return new Budynek(budynekDTO.getId(), budynekDTO.getUlica(), budynekDTO.getNumerBudynku(),
                budynekDTO.getKodPocztowy(), budynekDTO.getMiasto(), budynekDTO.getLiczbaMiejsc(),
                null, null
                );
    }

    /**
     * Konwertuje listę encji {@link Budynek} na listę DTO {@link BudynekDTO}.
     *
     * @param budynki lista encji {@link Budynek} do konwersji
     * @return odpowiadająca lista DTO {@link BudynekDTO}
     */
    public List<BudynekDTO> convertToDTO(List<Budynek> budynki) {
        return budynki.stream().map(budynek -> convertToDTO(budynek)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link BudynekDTO} na listę encji {@link Budynek}.
     *
     * @param budynkiDTO lista DTO {@link BudynekDTO} do konwersji
     * @return odpowiadająca lista encji {@link Budynek}
     */
    public List<Budynek> convertToEntity(List<BudynekDTO> budynkiDTO) {
        return budynkiDTO.stream().map(budynekDTO -> convertToEntity(budynekDTO)).collect(Collectors.toList());
    }

}
