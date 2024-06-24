package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MeldunkiWyswietlDTO;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.service.MeldunekService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

/**
 * Kontroler obsługujący operacje na zasobach związanych z meldunkami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/meldunki")
@RestController
public class MeldunekController {

    private final MeldunekService meldunekService;

    private final MeldunekMapper meldunekMapper;

    /**
     * Pobiera wszystkie meldunki.
     *
     * @return lista {@link MeldunekDTO} reprezentująca wszystkie meldunki
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findAll() {
        return meldunekMapper.convertToDTO(meldunekService.findAll());
    }

    /**
     * Dodaje nowy meldunek.
     *
     * @param meldunek obiekt {@link MeldunekDTO} reprezentujący nowy meldunek do dodania
     * @return dodany {@link MeldunekDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MeldunekDTO add(@RequestBody @Valid MeldunekDTO meldunek) {
        return meldunekMapper.convertToDTO(meldunekService.save(meldunekMapper.convertToEntity(meldunek)));
    }

    /**
     * Pobiera meldunek o podanym identyfikatorze.
     *
     * @param id identyfikator meldunku
     * @return {@link MeldunekDTO} reprezentujący meldunek o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MeldunekDTO findById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(meldunekService.findById(id));
    }

    /**
     * Aktualizuje meldunek o podanym identyfikatorze.
     *
     * @param newMeldunek obiekt {@link MeldunekDTO} reprezentujący nowy meldunek do zaktualizowania
     * @param id identyfikator meldunku do zaktualizowania
     * @return zaktualizowany {@link MeldunekDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MeldunekDTO replace(@RequestBody @Valid MeldunekDTO newMeldunek, @PathVariable Long id) {
        return meldunekMapper.convertToDTO(meldunekService.replace(meldunekMapper.convertToEntity(newMeldunek), id));
    }

    /**
     * Pobiera szczegóły meldunku do wyświetlenia na podstawie jego identyfikatora.
     *
     * @param id identyfikator meldunku
     * @return {@link MeldunkiWyswietlDTO} reprezentujący szczegóły meldunku do wyświetlenia
     */
    @GetMapping("/{id}/meldunkiWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public MeldunkiWyswietlDTO findMeldunekToDisplayById(@PathVariable Long id) {
        Meldunek meldunek = meldunekService.findById(id);
        return new MeldunkiWyswietlDTO(meldunek.getId(), meldunek.getOsoba().getId(), meldunek.getMieszkanie().getId(),
                meldunek.getMieszkanie().getNumerMieszkania(), meldunek.getOsoba().getImie(),
                meldunek.getOsoba().getNazwisko(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(), meldunek.isWynajmujacy());
    }

}
