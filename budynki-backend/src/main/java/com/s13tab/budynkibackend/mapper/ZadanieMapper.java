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

@RequiredArgsConstructor
@Component
public class ZadanieMapper {

    private final FirmaService firmaService;

    private final ZgloszenieService zgloszenieService;

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

    public List<ZadanieDTO> convertToDTO(List<Zadanie> zadania) {
        return zadania.stream().map(zadanie -> convertToDTO(zadanie)).collect(Collectors.toList());
    }

    public List<Zadanie> convertToEntity(List<ZadanieDTO> zadaniaDTO) {
        return zadaniaDTO.stream().map(zadanieDTO -> convertToEntity(zadanieDTO)).collect(Collectors.toList());
    }

}
