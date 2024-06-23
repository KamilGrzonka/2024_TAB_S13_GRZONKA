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

import com.s13tab.budynkibackend.dto.OsobaDTO;
import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.dto.ZgloszeniaWyswietlDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.OsobaMapper;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;
import com.s13tab.budynkibackend.service.ZgloszenieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/api/zgloszenia")
@RestController
public class ZgloszenieController {
    
    private final ZgloszenieMapper zgloszenieMapper;
    private final ZgloszenieService zgloszenieService;
    private final ZadanieMapper zadanieMapper;
    private final OsobaMapper osobaMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findAll()
    {
        return zgloszenieMapper.convertToDTO(zgloszenieService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZgloszenieDTO findById(@PathVariable Long id)
    {
        return zgloszenieMapper.convertToDTO(zgloszenieService.findById(id));
    }

    @GetMapping("/{id}/zadania")
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findZadaniaById(@PathVariable Long id)
    {
        return zadanieMapper.convertToDTO(zgloszenieService.findZadaniaById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ZgloszenieDTO save(@RequestBody @Valid ZgloszenieDTO newZgloszenie)
    {
        return zgloszenieMapper.convertToDTO(zgloszenieService.save(zgloszenieMapper.convertToEntity(newZgloszenie)));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ZgloszenieDTO replace(@RequestBody @Valid ZgloszenieDTO newZgloszenie, @PathVariable Long id)
    {
        return zgloszenieMapper.convertToDTO(zgloszenieService.replace(zgloszenieMapper.convertToEntity(newZgloszenie), id));
    }

    @GetMapping("/{id}/osoba")
    @ResponseStatus(HttpStatus.OK)
    public OsobaDTO findOsobaById(@PathVariable Long id)
    {
        return osobaMapper.convertToDTO(zgloszenieService.findOsobaById(id));
    }

    @GetMapping("/{id}/zgloszeniaWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public ZgloszeniaWyswietlDTO findZgloszenieToDisplayById(@PathVariable Long id)
    {
        return zgloszenieService.findZgloszenieToDisplayById(id);
    }

}
