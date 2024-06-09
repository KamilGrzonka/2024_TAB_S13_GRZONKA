package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.service.MieszkanieService;
import com.s13tab.budynkibackend.service.OsobaService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class MeldunekMapper {

    private final OsobaService osobaService;

    private final MieszkanieService mieszkanieService;

    public MeldunekDTO convertToDTO(Meldunek meldunek) {
        return new MeldunekDTO(meldunek.getId(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(),
                meldunek.isWynajmujacy(),
                meldunek.getOsoba().getId(), meldunek.getMieszkanie().getId());
    }

    public Meldunek convertToEntity(MeldunekDTO meldunekDTO) {
        return new Meldunek(meldunekDTO.getId(), meldunekDTO.getDataMeldunku(), meldunekDTO.getDataWymeldowania(),
                meldunekDTO.getWynajmujacy(),
                osobaService.findById(meldunekDTO.getOsobaId()),
                mieszkanieService.findById(meldunekDTO.getMieszkanieId()), null);
    }

    public List<MeldunekDTO> convertToDTO(List<Meldunek> meldunki) {
        return meldunki.stream().map(meldunek -> convertToDTO(meldunek)).collect(Collectors.toList());
    }

    public List<Meldunek> convertToEntity(List<MeldunekDTO> meldunkiDTO) {
        return meldunkiDTO.stream().map(meldunekDTO -> convertToEntity(meldunekDTO)).collect(Collectors.toList());
    }

}
