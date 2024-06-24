package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.PlatnoscDTO;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.service.MeldunekService;
import com.s13tab.budynkibackend.service.ZadanieService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Platnosc} a DTO {@link PlatnoscDTO}.
 */
@RequiredArgsConstructor
@Component
public class PlatnoscMapper {

    private final ZadanieService zadanieService;

    private final MeldunekService meldunekService;

    /**
     * Konwertuje encję {@link Platnosc} na DTO {@link PlatnoscDTO}.
     *
     * @param platnosc encja {@link Platnosc} do konwersji
     * @return odpowiadające DTO {@link PlatnoscDTO}
     */
    public PlatnoscDTO convertToDTO(Platnosc platnosc) {
        Long meldunekId = null;
        Meldunek meldunek = platnosc.getMeldunek();
        if(meldunek != null)
        {
            meldunekId = meldunek.getId();
        }
        Long zadanieId = null;
        Zadanie zadanie = platnosc.getZadanie();
        if(zadanie != null)
        {
            zadanieId = zadanie.getId();
        }
        return new PlatnoscDTO(platnosc.getId(), platnosc.getDataZrealizowania(), platnosc.getWartosc(),
                zadanieId, meldunekId);
    }

    /**
     * Konwertuje DTO {@link PlatnoscDTO} na encję {@link Platnosc}.
     *
     * @param platnoscDTO DTO {@link PlatnoscDTO} do konwersji
     * @return odpowiadająca encja {@link Platnosc}
     */
    public Platnosc convertToEntity(PlatnoscDTO platnoscDTO) {
        Meldunek meldunek = null;
        Long meldunekId = platnoscDTO.getMeldunekId();
        if(meldunekId != null)
        {
            meldunek = meldunekService.findById(meldunekId);
        }
        Zadanie zadanie = null;
        Long zadanieId = platnoscDTO.getZadanieId();
        if(zadanieId != null)
        {
            zadanie = zadanieService.findById(zadanieId);
        }
        return new Platnosc(platnoscDTO.getId(), platnoscDTO.getDataZrealizowania(),
                platnoscDTO.getWartosc(), zadanie, meldunek);
    }

    /**
     * Konwertuje listę encji {@link Platnosc} na listę DTO {@link PlatnoscDTO}.
     *
     * @param platnosci lista encji {@link Platnosc} do konwersji
     * @return odpowiadająca lista DTO {@link PlatnoscDTO}
     */
    public List<PlatnoscDTO> convertToDTO(List<Platnosc> platnosci) {
        return platnosci.stream().map(platnosc -> convertToDTO(platnosc)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link PlatnoscDTO} na listę encji {@link Platnosc}.
     *
     * @param platnosciDTO lista DTO {@link PlatnoscDTO} do konwersji
     * @return odpowiadająca lista encji {@link Platnosc}
     */
    public List<Platnosc> convertToEntity(List<PlatnoscDTO> platnosciDTO) {
        return platnosciDTO.stream().map(platnoscDTO -> convertToEntity(platnoscDTO)).collect(Collectors.toList());
    }

}
