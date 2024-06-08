package com.s13tab.budynkibackend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.dto.BudynekDTO;
import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MeldunkiWyswietlDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.BudynekMapper;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;
import com.s13tab.budynkibackend.model.Meldunek;
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
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/budynki")
@RestController
public class BudynekController {

    private final BudynekService budynekService;

    private final BudynekMapper budynekMapper;
    private final MieszkanieMapper mieszkanieMapper;
    private final MeldunekMapper meldunekMapper;
    private final ZgloszenieMapper zgloszenieMapper;

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

    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(budynekService.findMeldunkiById(id));
    }

    @GetMapping("/{id}/zgloszenia")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findZgloszeniaById(@PathVariable Long id) {
        return zgloszenieMapper.convertToDTO(budynekService.findZgloszeniaById(id));
    }

    @GetMapping("/{id}/meldunkiWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunkiWyswietlDTO> findMeldunkiToDisplayById(@PathVariable Long id) {
        List<Meldunek> meldunki = budynekService.findMeldunkiById(id);
        return meldunki.stream()
                .map(meldunek -> new MeldunkiWyswietlDTO(meldunek.getId(), meldunek.getOsoba().getId(),
                        meldunek.getMieszkanie().getId(),
                        meldunek.getMieszkanie().getNumerMieszkania(), meldunek.getOsoba().getImie(),
                        meldunek.getOsoba().getNazwisko(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(), meldunek.isWynajmujacy()))
                .collect(Collectors.toList());
    }

}
