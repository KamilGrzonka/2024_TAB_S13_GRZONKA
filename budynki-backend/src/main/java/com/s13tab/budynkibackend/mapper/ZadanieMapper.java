package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.ZadanieDTO;
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
        return new ZadanieDTO(zadanie.getId(), zadanie.getKoszt(), zadanie.getOpis(),
                zadanie.getDataRozpoczecia(), zadanie.getDataZakonczenia(),
                zadanie.getFirma().getId(), zadanie.getZgloszenie().getId());
    }

    public Zadanie convertToEntity(ZadanieDTO zadanieDTO) {
        return new Zadanie(zadanieDTO.getId(), zadanieDTO.getKoszt(), zadanieDTO.getOpis(),
                zadanieDTO.getDataRozpoczecia(), zadanieDTO.getDataZakonczenia(),
                firmaService.findById(zadanieDTO.getFirmaId()),
                zgloszenieService.findById(zadanieDTO.getZgloszenieId()));
    }

    public List<ZadanieDTO> convertToDTO(List<Zadanie> zadania) {
        return zadania.stream().map(zadanie -> convertToDTO(zadanie)).collect(Collectors.toList());
    }

    public List<Zadanie> convertToEntity(List<ZadanieDTO> zadaniaDTO) {
        return zadaniaDTO.stream().map(zadanieDTO -> convertToEntity(zadanieDTO)).collect(Collectors.toList());
    }

}
