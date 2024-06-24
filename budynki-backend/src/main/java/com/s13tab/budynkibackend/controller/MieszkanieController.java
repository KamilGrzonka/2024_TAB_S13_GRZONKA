package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.service.MieszkanieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.CennikMapper;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;

/**
 * Kontroler obsługujący operacje na zasobach związanych z mieszkaniami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/mieszkania")
@RestController
public class MieszkanieController {

    private final MieszkanieService mieszkanieService;

    private final MieszkanieMapper mieszkanieMapper;
    private final MeldunekMapper meldunekMapper;
    private final CennikMapper cennikMapper;
    private final ZgloszenieMapper zgloszenieMapper;

    /**
     * Pobiera wszystkie mieszkania.
     *
     * @return lista {@link MieszkanieDTO} reprezentująca wszystkie mieszkania
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MieszkanieDTO> findAll() {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findAll());
    }

    /**
     * Dodaje nowe mieszkanie.
     *
     * @param mieszkanie obiekt {@link MieszkanieDTO} reprezentujący nowe mieszkanie do dodania
     * @return dodane {@link MieszkanieDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MieszkanieDTO add(@RequestBody @Valid MieszkanieDTO mieszkanie) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.save(mieszkanieMapper.convertToEntity(mieszkanie)));
    }

    /**
     * Pobiera mieszkanie o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return {@link MieszkanieDTO} reprezentujący mieszkanie o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MieszkanieDTO findById(@PathVariable Long id) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findById(id));
    }

    /**
     * Aktualizuje mieszkanie o podanym identyfikatorze.
     *
     * @param newMieszkanie obiekt {@link MieszkanieDTO} reprezentujący nowe mieszkanie do zaktualizowania
     * @param id identyfikator mieszkania do zaktualizowania
     * @return zaktualizowane {@link MieszkanieDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MieszkanieDTO replace(@RequestBody @Valid MieszkanieDTO newMieszkanie, @PathVariable Long id) {
        return mieszkanieMapper
                .convertToDTO(mieszkanieService.replace(mieszkanieMapper.convertToEntity(newMieszkanie), id));
    }

    /**
     * Pobiera meldunki przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista {@link MeldunekDTO} reprezentująca meldunki przypisane do mieszkania
     */
    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(mieszkanieService.findMeldunkiById(id));
    }

    /**
     * Pobiera cenniki przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista {@link CennikDTO} reprezentująca cenniki przypisane do mieszkania
     */
    @GetMapping("/{id}/cenniki")
    @ResponseStatus(HttpStatus.OK)
    public List<CennikDTO> findCennikiById(@PathVariable Long id) {
        return cennikMapper.convertToDTO(mieszkanieService.findCennikiById(id));
    }

    /**
     * Pobiera zgłoszenia przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista {@link ZgloszenieDTO} reprezentująca zgłoszenia przypisane do mieszkania
     */
    @GetMapping("/{id}/zgloszenia")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findZgloszeniaById(@PathVariable Long id) {
        return zgloszenieMapper.convertToDTO(mieszkanieService.findZgloszeniaById(id));
    }

}
