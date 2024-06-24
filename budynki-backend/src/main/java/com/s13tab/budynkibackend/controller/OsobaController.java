package com.s13tab.budynkibackend.controller;

import java.util.List;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.OsobaDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.OsobaMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.service.OsobaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Kontroler obsługujący operacje na zasobach związanych z osobami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/osoby")
@RestController
public class OsobaController {

    private final OsobaService osobaService;

    private final OsobaMapper osobaMapper;
    private final MeldunekMapper meldunekMapper;
    private final ZgloszenieMapper zgloszenieMapper;

    /**
     * Pobiera wszystkie osoby.
     *
     * @return lista {@link OsobaDTO} reprezentująca wszystkie osoby
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OsobaDTO> findAll() {
        return osobaMapper.convertToDTO(osobaService.findAll());
    }

    /**
     * Dodaje nową osobę.
     *
     * @param osoba obiekt {@link OsobaDTO} reprezentujący nową osobę do dodania
     * @return dodana {@link OsobaDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OsobaDTO add(@RequestBody @Valid OsobaDTO osoba) {
        return osobaMapper.convertToDTO(osobaService.save(osobaMapper.convertToEntity(osoba)));
    }

    /**
     * Pobiera osobę o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return {@link OsobaDTO} reprezentujący osobę o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OsobaDTO findById(@PathVariable Long id) {
        return osobaMapper.convertToDTO(osobaService.findById(id));
    }

    /**
     * Aktualizuje osobę o podanym identyfikatorze.
     *
     * @param newOsoba obiekt {@link OsobaDTO} reprezentujący nowe dane osoby do zaktualizowania
     * @param id identyfikator osoby do zaktualizowania
     * @return zaktualizowana {@link OsobaDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OsobaDTO replace(@RequestBody @Valid OsobaDTO newOsoba, @PathVariable Long id) {
        return osobaMapper.convertToDTO(osobaService.replace(osobaMapper.convertToEntity(newOsoba), id));
    }

    /**
     * Pobiera meldunki przypisane do osoby o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return lista {@link MeldunekDTO} reprezentująca meldunki przypisane do osoby
     */
    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(osobaService.findMeldunkiById(id));
    }

    /**
     * Pobiera zgłoszenia przypisane do osoby o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return lista {@link ZgloszenieDTO} reprezentująca zgłoszenia przypisane do osoby
     */
    @GetMapping("/{id}/zgloszenia")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findZgloszeniaById(@PathVariable Long id) {
        return zgloszenieMapper.convertToDTO(osobaService.findZgloszeniaById(id));
    }

}
