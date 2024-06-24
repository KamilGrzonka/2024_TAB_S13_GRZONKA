package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.service.MieszkanieService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Cennik} a DTO {@link CennikDTO}.
 */
@RequiredArgsConstructor
@Component
public class CennikMapper {

    private final MieszkanieService mieszkanieService;

    /**
     * Konwertuje encję {@link Cennik} na DTO {@link CennikDTO}.
     *
     * @param cennik encja {@link Cennik} do konwersji
     * @return odpowiadające DTO {@link CennikDTO}
     */
    public CennikDTO convertToDTO(Cennik cennik) {
        return new CennikDTO(cennik.getId(), cennik.getDataPoczatkowa(), cennik.getDataKoncowa(),
                cennik.getCena(), cennik.getMieszkanie().getId());
    }

    /**
     * Konwertuje DTO {@link CennikDTO} na encję {@link Cennik}.
     *
     * @param cennikDTO DTO {@link CennikDTO} do konwersji
     * @return odpowiadająca encja {@link Cennik}
     */
    public Cennik convertToEntity(CennikDTO cennikDTO) {
        return new Cennik(cennikDTO.getId(), cennikDTO.getDataPoczatkowa(), cennikDTO.getDataKoncowa(),
                cennikDTO.getCena(), mieszkanieService.findById(cennikDTO.getMieszkanieId()));
    }

    /**
     * Konwertuje listę encji {@link Cennik} na listę DTO {@link CennikDTO}.
     *
     * @param cenniki lista encji {@link Cennik} do konwersji
     * @return odpowiadająca lista DTO {@link CennikDTO}
     */
    public List<CennikDTO> convertToDTO(List<Cennik> cenniki) {
        return cenniki.stream().map(cennik -> convertToDTO(cennik)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link CennikDTO} na listę encji {@link Cennik}.
     *
     * @param cennikiDTO lista DTO {@link CennikDTO} do konwersji
     * @return odpowiadająca lista encji {@link Cennik}
     */
    public List<Cennik> convertToEntity(List<CennikDTO> cennikiDTO) {
        return cennikiDTO.stream().map(cennikDTO -> convertToEntity(cennikDTO)).collect(Collectors.toList());
    }

}
