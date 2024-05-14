package com.s13tab.budynkibackend.controller;

import java.util.List;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.OsobaDTO;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.OsobaMapper;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.service.OsobaService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/osoby")
@RestController
public class OsobaController {

    private final OsobaService osobaService;

    private final OsobaMapper osobaMapper;

    private final MeldunekMapper meldunekMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<OsobaDTO> findAll() {
        return osobaMapper.convertToDTO(osobaService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OsobaDTO add(@RequestBody OsobaDTO osoba) {
        return osobaMapper.convertToDTO(osobaService.save(osobaMapper.convertToEntity(osoba)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OsobaDTO findById(@PathVariable Long id) {
        return osobaMapper.convertToDTO(osobaService.findById(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK) // powinno być OK przy zamianie i CREATE przy stworzeniu nowego
    public OsobaDTO replace(@RequestBody OsobaDTO newOsoba, @PathVariable Long id) {
        return osobaMapper.convertToDTO(osobaService.replace(osobaMapper.convertToEntity(newOsoba), id));
    }

    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(osobaService.findMeldunkiById(id));
    }

}
