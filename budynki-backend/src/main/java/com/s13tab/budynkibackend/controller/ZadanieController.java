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

import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.service.ZadanieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Kontroler obsługujący operacje na zasobach związanych z zadaniami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/zadania")
@RestController
public class ZadanieController {

    private final ZadanieService zadanieService;
    private final ZadanieMapper zadanieMapper;

    /**
     * Pobiera wszystkie zadania.
     *
     * @return lista {@link ZadanieDTO} reprezentująca wszystkie zadania
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findAll()
    {
        return zadanieMapper.convertToDTO(zadanieService.findAll());
    }

    /**
     * Pobiera zadanie o podanym identyfikatorze.
     *
     * @param id identyfikator zadania
     * @return {@link ZadanieDTO} reprezentujący zadanie o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZadanieDTO findById(@PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(zadanieService.findById(id));
    }

    /**
     * Zapisuje nowe zadanie.
     *
     * @param newZadanie obiekt {@link ZadanieDTO} reprezentujący nowe zadanie do zapisania
     * @return zapisane {@link ZadanieDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ZadanieDTO save(@RequestBody @Valid ZadanieDTO newZadanie)
    {
        return zadanieMapper.convertToDTO(zadanieService.save(zadanieMapper.convertToEntity(newZadanie)));
    }

    /**
     * Aktualizuje zadanie o podanym identyfikatorze.
     *
     * @param newZadanie obiekt {@link ZadanieDTO} reprezentujący nowe dane zadania do zaktualizowania
     * @param id identyfikator zadania do zaktualizowania
     * @return zaktualizowane {@link ZadanieDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZadanieDTO replace(@RequestBody @Valid ZadanieDTO newZadanie, @PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(zadanieService.replace(zadanieMapper.convertToEntity(newZadanie), id));
    }
    
}
