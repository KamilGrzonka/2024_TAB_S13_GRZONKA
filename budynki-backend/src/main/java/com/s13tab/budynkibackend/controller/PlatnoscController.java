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

import com.s13tab.budynkibackend.dto.PlatnoscDTO;
import com.s13tab.budynkibackend.mapper.PlatnoscMapper;
import com.s13tab.budynkibackend.service.PlatnoscService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Kontroler obsługujący operacje na zasobach związanych z płatnościami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/platnosci")
@RestController
public class PlatnoscController {
    
    private final PlatnoscMapper platnoscMapper;
    private final PlatnoscService platnoscService;

    /**
     * Pobiera wszystkie płatności.
     *
     * @return lista {@link PlatnoscDTO} reprezentująca wszystkie płatności
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PlatnoscDTO> findAll()
    {
        return platnoscMapper.convertToDTO(platnoscService.findAll());
    }

    /**
     * Pobiera płatność o podanym identyfikatorze.
     *
     * @param id identyfikator płatności
     * @return {@link PlatnoscDTO} reprezentujący płatność o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PlatnoscDTO findById(@PathVariable Long id)
    {
        return platnoscMapper.convertToDTO(platnoscService.findById(id));
    }

    /**
     * Zapisuje nową płatność.
     *
     * @param newPlatnosc obiekt {@link PlatnoscDTO} reprezentujący nową płatność do zapisania
     * @return zapisana {@link PlatnoscDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlatnoscDTO save(@RequestBody @Valid PlatnoscDTO newPlatnosc)
    {
        return platnoscMapper.convertToDTO(platnoscService.save(platnoscMapper.convertToEntity(newPlatnosc)));
    }

    /**
     * Aktualizuje płatność o podanym identyfikatorze.
     *
     * @param newPlatnosc obiekt {@link PlatnoscDTO} reprezentujący nowe dane płatności do zaktualizowania
     * @param id identyfikator płatności do zaktualizowania
     * @return zaktualizowana {@link PlatnoscDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public PlatnoscDTO replace(@RequestBody @Valid PlatnoscDTO newPlatnosc, @PathVariable Long id)
    {
        return platnoscMapper.convertToDTO(platnoscService.replace(platnoscMapper.convertToEntity(newPlatnosc), id));
    }

}
