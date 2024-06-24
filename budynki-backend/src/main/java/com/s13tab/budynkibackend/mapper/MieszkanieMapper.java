package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.service.BudynekService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Mieszkanie} a DTO {@link MieszkanieDTO}.
 */
@RequiredArgsConstructor
@Component
public class MieszkanieMapper {

    private final BudynekService budynekService;

    /**
     * Konwertuje encję {@link Mieszkanie} na DTO {@link MieszkanieDTO}.
     *
     * @param mieszkanie encja {@link Mieszkanie} do konwersji
     * @return odpowiadające DTO {@link MieszkanieDTO}
     */
    public MieszkanieDTO convertToDTO(Mieszkanie mieszkanie) {
        return new MieszkanieDTO(mieszkanie.getId(), mieszkanie.getNumerMieszkania(),
                mieszkanie.getPietro(),
                mieszkanie.getLiczbaMieszkancow(), mieszkanie.getOpis(),
                mieszkanie.getBudynek().getId()
                );
    }

    /**
     * Konwertuje DTO {@link MieszkanieDTO} na encję {@link Mieszkanie}.
     *
     * @param mieszkanieDTO DTO {@link MieszkanieDTO} do konwersji
     * @return odpowiadająca encja {@link Mieszkanie}
     */
    public Mieszkanie convertToEntity(MieszkanieDTO mieszkanieDTO) {
        return new Mieszkanie(mieszkanieDTO.getId(), mieszkanieDTO.getNumerMieszkania(),
                mieszkanieDTO.getPietro(), mieszkanieDTO.getLiczbaMieszkancow(),
                mieszkanieDTO.getOpis(), budynekService.findById(mieszkanieDTO.getBudynekId()),
                null, null, null
                );
    }

    /**
     * Konwertuje listę encji {@link Mieszkanie} na listę DTO {@link MieszkanieDTO}.
     *
     * @param mieszkania lista encji {@link Mieszkanie} do konwersji
     * @return odpowiadająca lista DTO {@link MieszkanieDTO}
     */
    public List<MieszkanieDTO> convertToDTO(List<Mieszkanie> mieszkania) {
        return mieszkania.stream().map(mieszkanie -> convertToDTO(mieszkanie)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link MieszkanieDTO} na listę encji {@link Mieszkanie}.
     *
     * @param mieszkaniaDTO lista DTO {@link MieszkanieDTO} do konwersji
     * @return odpowiadająca lista encji {@link Mieszkanie}
     */
    public List<Mieszkanie> convertToEntity(List<MieszkanieDTO> mieszkaniaDTO) {
        return mieszkaniaDTO.stream().map(mieszkanieDTO -> convertToEntity(mieszkanieDTO)).collect(Collectors.toList());
    }

}
