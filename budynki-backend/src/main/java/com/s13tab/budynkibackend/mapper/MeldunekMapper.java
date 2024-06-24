package com.s13tab.budynkibackend.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.service.MieszkanieService;
import com.s13tab.budynkibackend.service.OsobaService;

import lombok.RequiredArgsConstructor;

/**
 * Klasa odpowiedzialna za mapowanie pomiędzy encją {@link Meldunek} a DTO {@link MeldunekDTO}.
 */
@RequiredArgsConstructor
@Component
public class MeldunekMapper {

    private final OsobaService osobaService;

    private final MieszkanieService mieszkanieService;

    /**
     * Konwertuje encję {@link Meldunek} na DTO {@link MeldunekDTO}.
     *
     * @param meldunek encja {@link Meldunek} do konwersji
     * @return odpowiadające DTO {@link MeldunekDTO}
     */
    public MeldunekDTO convertToDTO(Meldunek meldunek) {
        return new MeldunekDTO(meldunek.getId(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(),
                meldunek.isWynajmujacy(),
                meldunek.getOsoba().getId(), meldunek.getMieszkanie().getId());
    }

    /**
     * Konwertuje DTO {@link MeldunekDTO} na encję {@link Meldunek}.
     *
     * @param meldunekDTO DTO {@link MeldunekDTO} do konwersji
     * @return odpowiadająca encja {@link Meldunek}
     */
    public Meldunek convertToEntity(MeldunekDTO meldunekDTO) {
        return new Meldunek(meldunekDTO.getId(), meldunekDTO.getDataMeldunku(), meldunekDTO.getDataWymeldowania(),
                meldunekDTO.getWynajmujacy(),
                osobaService.findById(meldunekDTO.getOsobaId()),
                mieszkanieService.findById(meldunekDTO.getMieszkanieId()), null);
    }

    /**
     * Konwertuje listę encji {@link Meldunek} na listę DTO {@link MeldunekDTO}.
     *
     * @param meldunki lista encji {@link Meldunek} do konwersji
     * @return odpowiadająca lista DTO {@link MeldunekDTO}
     */
    public List<MeldunekDTO> convertToDTO(List<Meldunek> meldunki) {
        return meldunki.stream().map(meldunek -> convertToDTO(meldunek)).collect(Collectors.toList());
    }

    /**
     * Konwertuje listę DTO {@link MeldunekDTO} na listę encji {@link Meldunek}.
     *
     * @param meldunkiDTO lista DTO {@link MeldunekDTO} do konwersji
     * @return odpowiadająca lista encji {@link Meldunek}
     */
    public List<Meldunek> convertToEntity(List<MeldunekDTO> meldunkiDTO) {
        return meldunkiDTO.stream().map(meldunekDTO -> convertToEntity(meldunekDTO)).collect(Collectors.toList());
    }

}
