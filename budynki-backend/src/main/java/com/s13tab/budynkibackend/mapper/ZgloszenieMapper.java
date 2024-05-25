package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
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
        return new ZgloszenieDTO(zgloszenie.getId(), zgloszenie.getDataZgloszenia(),
                zgloszenie.getDataWykonania(), zgloszenie.getStatusZgloszenia(),
                zgloszenie.getTypZgloszenia(),
                zgloszenie.getKosztCalkowity(), zgloszenie.getPriorytet(),
                zgloszenie.getOsoba().getId(),
                zgloszenie.getMieszkanie().getId(), zgloszenie.getBudynek().getId()
                // , zadania
                );
    }

    public Zgloszenie convertToEntity(ZgloszenieDTO zgloszenieDTO) {
        // List<Zadanie> zadania = zgloszenieDTO.getZadaniaId().stream()
        //         .map(zadanieId -> zadanieService.findById(zadanieId)).collect(Collectors.toList());
        return new Zgloszenie(zgloszenieDTO.getId(), zgloszenieDTO.getDataZgloszenia(),
                zgloszenieDTO.getDataWykonania(), zgloszenieDTO.getStatusZgloszenia(),
                zgloszenieDTO.getTypZgloszenia(),
                zgloszenieDTO.getKosztCalkowity(), zgloszenieDTO.getPriorytet(),
                osobaService.findById(zgloszenieDTO.getOsobaId()),
                mieszkanieService.findById(zgloszenieDTO.getMieszkanieId()),
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
