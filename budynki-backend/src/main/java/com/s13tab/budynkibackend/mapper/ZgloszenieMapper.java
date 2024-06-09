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

@RequiredArgsConstructor
@Component
public class ZgloszenieMapper {

    private final OsobaService osobaService;

    private final MieszkanieService mieszkanieService;

    private final BudynekService budynekService;

    // private final ZadanieService zadanieService;

    public ZgloszenieDTO convertToDTO(Zgloszenie zgloszenie) {
        // List<Long> zadania = zgloszenie.getZadania().stream().map(Zadanie::getId)
        //         .collect(Collectors.toList());
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
                // , zadania
                );
    }

    public Zgloszenie convertToEntity(ZgloszenieDTO zgloszenieDTO) {
        // List<Zadanie> zadania = zgloszenieDTO.getZadaniaId().stream()
        //         .map(zadanieId -> zadanieService.findById(zadanieId)).collect(Collectors.toList());
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
                // zadania
                null
                );
    }

    public List<ZgloszenieDTO> convertToDTO(List<Zgloszenie> zgloszenia) {
        return zgloszenia.stream().map(zgloszenie -> convertToDTO(zgloszenie)).collect(Collectors.toList());
    }

    public List<Zgloszenie> convertToEntity(List<ZgloszenieDTO> zgloszeniaDTO) {
        return zgloszeniaDTO.stream().map(zgloszenieDTO -> convertToEntity(zgloszenieDTO)).collect(Collectors.toList());
    }

}
