package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.FirmaDTO;
import com.s13tab.budynkibackend.model.Firma;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class FirmaMapper {

    // private final ZadanieService zadanieService;

    public FirmaDTO convertToDTO(Firma firma) {
        // List<Long> zadania = firma.getZadania().stream().map(Zadanie::getId)
        //         .collect(Collectors.toList());
        return new FirmaDTO(firma.getId(), firma.getNazwa(), firma.getNip(), firma.getUlica(),
                firma.getNumerBudynku(), firma.getNumerLokalu(), firma.getKodPocztowy(),
                firma.getMiasto()
                // , zadania
                );
    }

    public Firma convertToEntity(FirmaDTO firmaDTO) {
        // List<Zadanie> zadania = firmaDTO.getZadaniaId().stream()
        //         .map(zadanieId -> zadanieService.findById(zadanieId)).collect(Collectors.toList());
        return new Firma(firmaDTO.getId(), firmaDTO.getNazwa(), firmaDTO.getNip(),
                firmaDTO.getUlica(), firmaDTO.getNumerBudynku(), firmaDTO.getNumerLokalu(),
                firmaDTO.getKodPocztowy(),
                firmaDTO.getMiasto(), 
                // zadania
                null
                );
    }

    public List<FirmaDTO> convertToDTO(List<Firma> firmy) {
        return firmy.stream().map(firma -> convertToDTO(firma)).collect(Collectors.toList());
    }

    public List<Firma> convertToEntity(List<FirmaDTO> firmyDTO) {
        return firmyDTO.stream().map(firmaDTO -> convertToEntity(firmaDTO)).collect(Collectors.toList());
    }

}
