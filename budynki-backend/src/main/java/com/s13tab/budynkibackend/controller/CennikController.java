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

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.mapper.CennikMapper;
import com.s13tab.budynkibackend.service.CennikService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

/**
 * Kontroler obsługujący operacje na zasobach związanych z cennikami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/cenniki")
@RestController
public class CennikController {
    
    private final CennikMapper cennikMapper;
    private final CennikService cennikService;

    /**
     * Pobiera wszystkie cenniki.
     *
     * @return lista {@link CennikDTO} reprezentująca wszystkie cenniki
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CennikDTO> findAll()
    {
        return cennikMapper.convertToDTO(cennikService.findAll());
    }

    /**
     * Pobiera cennik o podanym identyfikatorze.
     *
     * @param id identyfikator cennika
     * @return {@link CennikDTO} reprezentujący cennik o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CennikDTO findById(@PathVariable Long id)
    {
        return cennikMapper.convertToDTO(cennikService.findById(id));
    }

    /**
     * Dodaje nowy cennik.
     *
     * @param newCennik obiekt {@link CennikDTO} reprezentujący nowy cennik do dodania
     * @return dodany {@link CennikDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CennikDTO add(@RequestBody @Valid CennikDTO newCennik)
    {
        return cennikMapper.convertToDTO(cennikService.save(cennikMapper.convertToEntity(newCennik)));
    }

    /**
     * Aktualizuje cennik o podanym identyfikatorze.
     *
     * @param newCennik obiekt {@link CennikDTO} reprezentujący nowy cennik do zaktualizowania
     * @param id identyfikator cennika do zaktualizowania
     * @return zaktualizowany {@link CennikDTO}
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CennikDTO replace(@RequestBody @Valid CennikDTO newCennik, @PathVariable Long id)
    {
        return cennikMapper.convertToDTO(cennikService.replace(cennikMapper.convertToEntity(newCennik), id));
    }


}
