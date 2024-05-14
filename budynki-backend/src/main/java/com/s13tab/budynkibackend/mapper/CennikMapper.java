package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.service.MieszkanieService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class CennikMapper {

    private final MieszkanieService mieszkanieService;

    public CennikDTO convertToDTO(Cennik cennik) {
        return new CennikDTO(cennik.getId(), cennik.getDataPoczatkowa(), cennik.getDataKoncowa(),
                cennik.getCena(), cennik.getMieszkanie().getId());
    }

    public Cennik convertToEntity(CennikDTO cennikDTO) {
        return new Cennik(cennikDTO.getId(), cennikDTO.getDataPoczatkowa(), cennikDTO.getDataKoncowa(),
                cennikDTO.getCena(), mieszkanieService.findById(cennikDTO.getMieszkanieId()));
    }

    public List<CennikDTO> convertToDTO(List<Cennik> cenniki) {
        return cenniki.stream().map(cennik -> convertToDTO(cennik)).collect(Collectors.toList());
    }

    public List<Cennik> convertToEntity(List<CennikDTO> cennikiDTO) {
        return cennikiDTO.stream().map(cennikDTO -> convertToEntity(cennikDTO)).collect(Collectors.toList());
    }

}
