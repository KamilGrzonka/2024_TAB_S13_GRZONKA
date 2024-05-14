package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.OsobaDTO;
import com.s13tab.budynkibackend.model.Osoba;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class OsobaMapper {

    // private final MeldunekService meldunekService;

    // private final UmowaService umowaService;

    public OsobaDTO convertToDTO(Osoba osoba) {
        // List<Long> meldunki = osoba.getMeldunki().stream().map(Meldunek::getId)
        //         .collect(Collectors.toList());
        // List<Long> umowy = osoba.getUmowy().stream().map(Umowa::getId)
        //         .collect(Collectors.toList());
        return new OsobaDTO(osoba.getId(), osoba.getPesel(), osoba.getImie(), osoba.getNazwisko()
                // , meldunki, umowy
                );
    }

    public Osoba convertToEntity(OsobaDTO osobaDTO) {
        // List<Meldunek> meldunki = osobaDTO.getMeldunkiId().stream()
        //         .map(meldunekId -> meldunekService.findById(meldunekId)).collect(Collectors.toList());
        // List<Umowa> umowy = osobaDTO.getUmowyId().stream()
        //         .map(umowaId -> umowaService.findById(umowaId)).collect(Collectors.toList());
        return new Osoba(osobaDTO.getId(), osobaDTO.getPesel(), osobaDTO.getImie(), osobaDTO.getNazwisko(),
                // meldunki, umowy
                null, null
                );
    }

    public List<OsobaDTO> convertToDTO(List<Osoba> osoby) {
        return osoby.stream().map(osoba -> convertToDTO(osoba)).collect(Collectors.toList());
    }

    public List<Osoba> convertToEntity(List<OsobaDTO> osobyDTO) {
        return osobyDTO.stream().map(osobaDTO -> convertToEntity(osobaDTO)).collect(Collectors.toList());
    }

}
