package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.UmowaDTO;
import com.s13tab.budynkibackend.model.Umowa;
import com.s13tab.budynkibackend.service.CennikService;
import com.s13tab.budynkibackend.service.OsobaService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class UmowaMapper {

    private final OsobaService osobaService;

    private final CennikService cennikService;

    public UmowaDTO convertToDTO(Umowa umowa) {
        return new UmowaDTO(umowa.getId(), umowa.getDataZawarcia(), umowa.getOsoba().getId(),
                umowa.getCennik().getId());
    }

    public Umowa convertToEntity(UmowaDTO umowaDTO) {
        return new Umowa(umowaDTO.getId(), umowaDTO.getDataZawarcia(), osobaService.findById(umowaDTO.getOsobaId()),
                cennikService.findById(umowaDTO.getCennikId()));
    }

    public List<UmowaDTO> convertToDTO(List<Umowa> umowy) {
        return umowy.stream().map(umowa -> convertToDTO(umowa)).collect(Collectors.toList());
    }

    public List<Umowa> convertToEntity(List<UmowaDTO> umowyDTO) {
        return umowyDTO.stream().map(umowaDTO -> convertToEntity(umowaDTO)).collect(Collectors.toList());
    }

}
