package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MeldunkiWyswietlDTO;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.service.MeldunekService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/meldunki")
@RestController
public class MeldunekController {

    private final MeldunekService meldunekService;

    private final MeldunekMapper meldunekMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findAll() {
        return meldunekMapper.convertToDTO(meldunekService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MeldunekDTO add(@RequestBody MeldunekDTO mieszkanie) {
        return meldunekMapper.convertToDTO(meldunekService.save(meldunekMapper.convertToEntity(mieszkanie)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MeldunekDTO findById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(meldunekService.findById(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK) // powinno być OK przy zamianie i CREATE przy stworzeniu nowego
    public MeldunekDTO replace(@RequestBody MeldunekDTO newMeldunek, @PathVariable Long id) {
        return meldunekMapper.convertToDTO(meldunekService.replace(meldunekMapper.convertToEntity(newMeldunek), id));
    }

    @GetMapping("/{id}/meldunkiWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public MeldunkiWyswietlDTO findMeldunekToDisplayById(@PathVariable Long id) {
        Meldunek meldunek = meldunekService.findById(id);
        return new MeldunkiWyswietlDTO(meldunek.getId(), meldunek.getOsoba().getId(), meldunek.getMieszkanie().getId(),
                meldunek.getMieszkanie().getNumerMieszkania(), meldunek.getOsoba().getImie(),
                meldunek.getOsoba().getNazwisko(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania());
    }

}
