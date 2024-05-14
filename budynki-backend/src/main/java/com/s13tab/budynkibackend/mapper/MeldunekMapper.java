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

    // private final ZgloszenieService zgloszenieService;

    public MeldunekDTO convertToDTO(Meldunek meldunek) {
        // List<Long> zgloszenia = meldunek.getZgloszenia().stream().map(Zgloszenie::getId)
        //         .collect(Collectors.toList());
        return new MeldunekDTO(meldunek.getId(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(),
                meldunek.getOsoba().getId(), meldunek.getMieszkanie().getId()
                // , zgloszenia
                );
    }

    public Meldunek convertToEntity(MeldunekDTO meldunekDTO) {
        // List<Zgloszenie> zgloszenia = meldunekDTO.getZgloszeniaId().stream()
        //         .map(zgloszenieId -> zgloszenieService.findById(zgloszenieId))
        //         .collect(Collectors.toList());
        return new Meldunek(meldunekDTO.getId(), meldunekDTO.getDataMeldunku(), meldunekDTO.getDataWymeldowania(),
                osobaService.findById(meldunekDTO.getOsobaId()),
                mieszkanieService.findById(meldunekDTO.getMieszkanieId()),
                // zgloszenia
                null
                );
    }

    public List<MeldunekDTO> convertToDTO(List<Meldunek> meldunki) {
        return meldunki.stream().map(meldunek -> convertToDTO(meldunek)).collect(Collectors.toList());
    }

    public List<Meldunek> convertToEntity(List<MeldunekDTO> meldunkiDTO) {
        return meldunkiDTO.stream().map(meldunekDTO -> convertToEntity(meldunekDTO)).collect(Collectors.toList());
    }

}
