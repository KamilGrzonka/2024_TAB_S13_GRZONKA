package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.service.BudynekService;
import com.s13tab.budynkibackend.service.MieszkanieService;
import com.s13tab.budynkibackend.service.OsobaService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Zgloszenie} a DTO {@link ZgloszenieDTO}.
 */
@RequiredArgsConstructor
@Component
public class ZgloszenieMapper {

    private final OsobaService osobaService;

    private final MieszkanieService mieszkanieService;

    private final BudynekService budynekService;

    /**
     * Konwertuje encję {@link Zgloszenie} na DTO {@link ZgloszenieDTO}.
     *
     * @param zgloszenie encja {@link Zgloszenie} do konwersji
     * @return odpowiadające DTO {@link ZgloszenieDTO}
     */
    public ZgloszenieDTO convertToDTO(Zgloszenie zgloszenie) {
        Long osobaId = null;
        Osoba osoba = zgloszenie.getOsoba();
        if(osoba != null)
        {
            osobaId = osoba.getId();
        }
        Long mieszkanieId = null;
        Mieszkanie mieszkanie = zgloszenie.getMieszkanie();
        if(mieszkanie != null)
        {
            mieszkanieId = mieszkanie.getId();
        }
        return new ZgloszenieDTO(zgloszenie.getId(), zgloszenie.getDataZgloszenia(),
                zgloszenie.getStatusZgloszenia(),
                zgloszenie.getTypZgloszenia(), zgloszenie.getPriorytet(),
                zgloszenie.getOpis(),
                osobaId,
                mieszkanieId, zgloszenie.getBudynek().getId()
                );
    }

    /**
     * Konwertuje DTO {@link ZgloszenieDTO} na encję {@link Zgloszenie}.
     *
     * @param zgloszenieDTO DTO {@link ZgloszenieDTO} do konwersji
     * @return odpowiadająca encja {@link Zgloszenie}
     */
    public Zgloszenie convertToEntity(ZgloszenieDTO zgloszenieDTO) {
        Osoba osoba = null;
        Long osobaId = zgloszenieDTO.getOsobaId();
        if(osobaId != null)
        {
            osoba = osobaService.findById(osobaId);
        }
        Mieszkanie mieszkanie = null;
        Long mieszkanieId = zgloszenieDTO.getMieszkanieId();
        if(mieszkanieId != null)
        {
            mieszkanie = mieszkanieService.findById(mieszkanieId);
        }
        return new Zgloszenie(zgloszenieDTO.getId(), zgloszenieDTO.getDataZgloszenia(),
                zgloszenieDTO.getStatusZgloszenia(),
                zgloszenieDTO.getTypZgloszenia(), zgloszenieDTO.getPriorytet(),
                zgloszenieDTO.getOpis(),
                osoba,
                mieszkanie,
                budynekService.findById(zgloszenieDTO.getBudynekId()),
                null
                );
    }

    /**
     * Konwertuje listę encji {@link Zgloszenie} na listę DTO {@link ZgloszenieDTO}.
     *
     * @param zgloszenia lista encji {@link Zgloszenie} do konwersji
     * @return odpowiadająca lista DTO {@link ZgloszenieDTO}
     */
    public List<ZgloszenieDTO> convertToDTO(List<Zgloszenie> zgloszenia) {
        return zgloszenia.stream().map(zgloszenie -> convertToDTO(zgloszenie)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link ZgloszenieDTO} na listę encji {@link Zgloszenie}.
     *
     * @param zgloszeniaDTO lista DTO {@link ZgloszenieDTO} do konwersji
     * @return odpowiadająca lista encji {@link Zgloszenie}
     */
    public List<Zgloszenie> convertToEntity(List<ZgloszenieDTO> zgloszeniaDTO) {
        return zgloszeniaDTO.stream().map(zgloszenieDTO -> convertToEntity(zgloszenieDTO)).collect(Collectors.toList());
    }

}
