package com.s13tab.budynkibackend.controller;

import java.util.List;

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

import com.s13tab.budynkibackend.dto.FirmaDTO;
import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.mapper.FirmaMapper;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.service.FirmaService;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Validated
@RequestMapping("/api/firmy")
@RestController
public class FirmaController {
    
    private final FirmaMapper firmaMapper;
    private final FirmaService firmaService;
    private final ZadanieMapper zadanieMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FirmaDTO> findAll()
    {
        return firmaMapper.convertToDTO(firmaService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FirmaDTO findById(@PathVariable Long id)
    {
        return firmaMapper.convertToDTO(firmaService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FirmaDTO save(@RequestBody FirmaDTO newFirma)
    {
        return firmaMapper.convertToDTO(firmaService.save(firmaMapper.convertToEntity(newFirma)));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public FirmaDTO replace(@RequestBody FirmaDTO newFirma, @PathVariable Long id)
    {
        return firmaMapper.convertToDTO(firmaService.replace(firmaMapper.convertToEntity(newFirma), id));
    }

    @GetMapping("/{id}/zadania")
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findZadaniaById(@PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(firmaService.findZadaniaById(id));
    }

}
