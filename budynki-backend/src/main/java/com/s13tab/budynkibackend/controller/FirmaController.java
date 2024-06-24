package com.s13tab.budynkibackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.dto.FirmaDTO;
import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.mapper.FirmaMapper;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.service.FirmaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Kontroler obsługujący operacje na zasobach związanych z firmami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/firmy")
@RestController
public class FirmaController {
    
    private final FirmaMapper firmaMapper;
    private final FirmaService firmaService;
    private final ZadanieMapper zadanieMapper;

    /**
     * Pobiera wszystkie firmy.
     *
     * @return lista {@link FirmaDTO} reprezentująca wszystkie firmy
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FirmaDTO> findAll()
    {
        return firmaMapper.convertToDTO(firmaService.findAll());
    }

    /**
     * Pobiera firmę o podanym identyfikatorze.
     *
     * @param id identyfikator firmy
     * @return {@link FirmaDTO} reprezentujący firmę o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FirmaDTO findById(@PathVariable Long id)
    {
        return firmaMapper.convertToDTO(firmaService.findById(id));
    }

    /**
     * Zapisuje nową firmę.
     *
     * @param newFirma obiekt {@link FirmaDTO} reprezentujący nową firmę do zapisania
     * @return zapisana {@link FirmaDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FirmaDTO save(@RequestBody @Valid FirmaDTO newFirma)
    {
        return firmaMapper.convertToDTO(firmaService.save(firmaMapper.convertToEntity(newFirma)));
    }

    /**
     * Aktualizuje firmę o podanym identyfikatorze.
     *
     * @param newFirma obiekt {@link FirmaDTO} reprezentujący firmę do zaktualizowania
     * @param id identyfikator firmy do zaktualizowania
     * @return zaktualizowana {@link FirmaDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FirmaDTO replace(@RequestBody @Valid FirmaDTO newFirma, @PathVariable Long id)
    {
        return firmaMapper.convertToDTO(firmaService.replace(firmaMapper.convertToEntity(newFirma), id));
    }

    /**
     * Pobiera zadania przypisane do firmy o podanym identyfikatorze.
     *
     * @param id identyfikator firmy
     * @return lista {@link ZadanieDTO} reprezentująca zadania przypisane do firmy
     */
    @GetMapping("/{id}/zadania")
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findZadaniaById(@PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(firmaService.findZadaniaById(id));
    }

}
