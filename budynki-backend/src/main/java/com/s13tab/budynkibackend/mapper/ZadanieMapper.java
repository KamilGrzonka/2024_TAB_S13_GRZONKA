package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.model.Firma;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.service.FirmaService;
import com.s13tab.budynkibackend.service.ZgloszenieService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Zadanie} a DTO {@link ZadanieDTO}.
 */
@RequiredArgsConstructor
@Component
public class ZadanieMapper {

    private final FirmaService firmaService;

    private final ZgloszenieService zgloszenieService;

    /**
     * Konwertuje encję {@link Zadanie} na DTO {@link ZadanieDTO}.
     *
     * @param zadanie encja {@link Zadanie} do konwersji
     * @return odpowiadające DTO {@link ZadanieDTO}
     */
    public ZadanieDTO convertToDTO(Zadanie zadanie) {
        Long firmaId = null;
        Firma firma = zadanie.getFirma();
        if(firma != null)
        {
            firmaId = firma.getId();
        }
        return new ZadanieDTO(zadanie.getId(), zadanie.getKoszt(), zadanie.getOpis(),
                zadanie.getDataRozpoczecia(), zadanie.getDataZakonczenia(),
                firmaId, zadanie.getZgloszenie().getId());
    }

    /**
     * Konwertuje DTO {@link ZadanieDTO} na encję {@link Zadanie}.
     *
     * @param zadanieDTO DTO {@link ZadanieDTO} do konwersji
     * @return odpowiadająca encja {@link Zadanie}
     */
    public Zadanie convertToEntity(ZadanieDTO zadanieDTO) {
        Firma firma = null;
        Long firmaId = zadanieDTO.getFirmaId();
        if(firmaId != null)
        {
            firma = firmaService.findById(firmaId);
        }
        return new Zadanie(zadanieDTO.getId(), zadanieDTO.getKoszt(), zadanieDTO.getOpis(),
                zadanieDTO.getDataRozpoczecia(), zadanieDTO.getDataZakonczenia(),
                firma,
                zgloszenieService.findById(zadanieDTO.getZgloszenieId()), null);
    }

    /**
     * Konwertuje listę encji {@link Zadanie} na listę DTO {@link ZadanieDTO}.
     *
     * @param zadania lista encji {@link Zadanie} do konwersji
     * @return odpowiadająca lista DTO {@link ZadanieDTO}
     */
    public List<ZadanieDTO> convertToDTO(List<Zadanie> zadania) {
        return zadania.stream().map(zadanie -> convertToDTO(zadanie)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link ZadanieDTO} na listę encji {@link Zadanie}.
     *
     * @param zadaniaDTO lista DTO {@link ZadanieDTO} do konwersji
     * @return odpowiadająca lista encji {@link Zadanie}
     */
    public List<Zadanie> convertToEntity(List<ZadanieDTO> zadaniaDTO) {
        return zadaniaDTO.stream().map(zadanieDTO -> convertToEntity(zadanieDTO)).collect(Collectors.toList());
    }

}
