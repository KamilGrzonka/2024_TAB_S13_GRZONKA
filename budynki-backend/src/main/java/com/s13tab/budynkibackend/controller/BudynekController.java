package com.s13tab.budynkibackend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.dto.BudynekDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.mapper.BudynekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;
import com.s13tab.budynkibackend.service.BudynekService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.List;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/budynki")
@RestController
public class BudynekController {

    private final BudynekService budynekService;

    private final BudynekMapper budynekMapper;

    private final MieszkanieMapper mieszkanieMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BudynekDTO> findAll() {
        return budynekMapper.convertToDTO(budynekService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BudynekDTO add(@RequestBody BudynekDTO budynek) {
        return budynekMapper.convertToDTO(budynekService.save(budynekMapper.convertToEntity(budynek)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BudynekDTO findById(@PathVariable Long id) {
        return budynekMapper.convertToDTO(budynekService.findById(id));
    }

    @GetMapping("/{id}/mieszkania")
    @ResponseStatus(HttpStatus.OK)
    public List<MieszkanieDTO> findMieszkaniaById(@PathVariable Long id) {

        return mieszkanieMapper.convertToDTO(budynekService.findMieszkaniaById(id));
    }

}
