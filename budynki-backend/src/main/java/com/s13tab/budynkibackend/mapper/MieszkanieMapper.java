package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.service.BudynekService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class MieszkanieMapper {

    private final BudynekService budynekService;

//     private final MeldunekService meldunekService;

//     private final CennikService cennikService;

//     private final ZgloszenieService zgloszenieService;

    public MieszkanieDTO convertToDTO(Mieszkanie mieszkanie) {
        // List<Long> meldunki = mieszkanie.getMeldunki().stream().map(Meldunek::getId)
        //         .collect(Collectors.toList());
        // List<Long> cenniki = mieszkanie.getCenniki().stream().map(Cennik::getId)
        //         .collect(Collectors.toList());
        // List<Long> zgloszenia = mieszkanie.getZgloszenia().stream().map(Zgloszenie::getId)
        //         .collect(Collectors.toList());
        return new MieszkanieDTO(mieszkanie.getId(), mieszkanie.getNumerMieszkania(),
                mieszkanie.getPietro(),
                mieszkanie.getLiczbaMieszkancow(), mieszkanie.getOpis(),
                mieszkanie.getBudynek().getId()
                // , meldunki, cenniki, zgloszenia
                );
    }

    public Mieszkanie convertToEntity(MieszkanieDTO mieszkanieDTO) {
        // List<Meldunek> meldunki = mieszkanieDTO.getMeldunkiId().stream()
        //         .map(meldunekId -> meldunekService.findById(meldunekId)).collect(Collectors.toList());
        // List<Cennik> cenniki = mieszkanieDTO.getZgloszeniaId().stream()
        //         .map(cennikId -> cennikService.findById(cennikId)).collect(Collectors.toList());
        // List<Zgloszenie> zgloszenia = mieszkanieDTO.getZgloszeniaId().stream()
        //         .map(zgloszenieId -> zgloszenieService.findById(zgloszenieId))
        //         .collect(Collectors.toList());
        return new Mieszkanie(mieszkanieDTO.getId(), mieszkanieDTO.getNumerMieszkania(),
                mieszkanieDTO.getPietro(), mieszkanieDTO.getLiczbaMieszkancow(),
                mieszkanieDTO.getOpis(), budynekService.findById(mieszkanieDTO.getBudynekId()),
                // meldunki, cenniki, zgloszenia
                null, null, null
                );
    }

    public List<MieszkanieDTO> convertToDTO(List<Mieszkanie> mieszkania) {
        return mieszkania.stream().map(mieszkanie -> convertToDTO(mieszkanie)).collect(Collectors.toList());
    }

    public List<Mieszkanie> convertToEntity(List<MieszkanieDTO> mieszkaniaDTO) {
        return mieszkaniaDTO.stream().map(mieszkanieDTO -> convertToEntity(mieszkanieDTO)).collect(Collectors.toList());
    }

}
