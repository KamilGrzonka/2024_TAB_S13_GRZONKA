package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.BudynekDTO;
import com.s13tab.budynkibackend.model.Budynek;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class BudynekMapper {

    // private final MieszkanieService mieszkanieService;
    // private final ZgloszenieService zgloszenieService;

    public BudynekDTO convertToDTO(Budynek budynek) {
        // List<Long> mieszkania = budynek.getMieszkania().stream().map(Mieszkanie::getId)
        //         .collect(Collectors.toList());
        // List<Long> zgloszenia = budynek.getZgloszenia().stream().map(Zgloszenie::getId)
        //         .collect(Collectors.toList());
        return new BudynekDTO(budynek.getId(), budynek.getUlica(), budynek.getNumerBudynku(),
                budynek.getKodPocztowy(), budynek.getMiasto(), budynek.getLiczbaMiejsc()
                // , mieszkania, zgloszenia
                );
    }

    public Budynek convertToEntity(BudynekDTO budynekDTO) {
        // List<Mieszkanie> mieszkania = budynekDTO.getMieszkaniaId().stream()
        //         .map(mieszkanieId -> mieszkanieService.findById(mieszkanieId))
        //         .collect(Collectors.toList());
        // List<Zgloszenie> zgloszenia = budynekDTO.getZgloszeniaId().stream()
        //         .map(zgloszenieId -> zgloszenieService.findById(zgloszenieId))
        //         .collect(Collectors.toList());
        return new Budynek(budynekDTO.getId(), budynekDTO.getUlica(), budynekDTO.getNumerBudynku(),
                budynekDTO.getKodPocztowy(), budynekDTO.getMiasto(), budynekDTO.getLiczbaMiejsc(),
                // mieszkania, zgloszenia
                null, null
                );
    }

    public List<BudynekDTO> convertToDTO(List<Budynek> budynki) {
        return budynki.stream().map(budynek -> convertToDTO(budynek)).collect(Collectors.toList());
    }

    public List<Budynek> convertToEntity(List<BudynekDTO> budynkiDTO) {
        return budynkiDTO.stream().map(budynekDTO -> convertToEntity(budynekDTO)).collect(Collectors.toList());
    }

}
