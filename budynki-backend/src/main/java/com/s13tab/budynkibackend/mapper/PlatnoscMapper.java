package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.PlatnoscDTO;
import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.service.UmowaService;
import com.s13tab.budynkibackend.service.ZadanieService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class PlatnoscMapper {

    private final ZadanieService zadanieService;

    private final UmowaService umowaService;

    public PlatnoscDTO convertToDTO(Platnosc platnosc) {
        return new PlatnoscDTO(platnosc.getId(), platnosc.getDataZrealizowania(), platnosc.getWartosc(),
                platnosc.getZadanie().getId(), platnosc.getUmowa().getId());
    }

    public Platnosc convertToEntity(PlatnoscDTO platnoscDTO) {
        return new Platnosc(platnoscDTO.getId(), platnoscDTO.getDataZrealizowania(),
                platnoscDTO.getWartosc(), zadanieService.findById(platnoscDTO.getZadanieId()),
                umowaService.findById(platnoscDTO.getUmowaId()));
    }

    public List<PlatnoscDTO> convertToDTO(List<Platnosc> platnosci) {
        return platnosci.stream().map(platnosc -> convertToDTO(platnosc)).collect(Collectors.toList());
    }

    public List<Platnosc> convertToEntity(List<PlatnoscDTO> platnosciDTO) {
        return platnosciDTO.stream().map(platnoscDTO -> convertToEntity(platnoscDTO)).collect(Collectors.toList());
    }

}
