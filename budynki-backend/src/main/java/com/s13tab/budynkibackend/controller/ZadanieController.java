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

import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.service.ZadanieService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/zadania")
@RestController
public class ZadanieController {

    private final ZadanieService zadanieService;
    private final ZadanieMapper zadanieMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findAll()
    {
        return zadanieMapper.convertToDTO(zadanieService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZadanieDTO findById(@PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(zadanieService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ZadanieDTO save(@RequestBody ZadanieDTO newZadanie)
    {
        return zadanieMapper.convertToDTO(zadanieService.save(zadanieMapper.convertToEntity(newZadanie)));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZadanieDTO replace(@RequestBody ZadanieDTO newZadanie, @PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(zadanieService.replace(zadanieMapper.convertToEntity(newZadanie), id));
    }
    
}
