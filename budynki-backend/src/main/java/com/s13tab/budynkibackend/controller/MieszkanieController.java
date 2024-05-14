package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.service.MieszkanieService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/mieszkania")
@RestController
public class MieszkanieController {

    private final MieszkanieService mieszkanieService;

    private final MieszkanieMapper mieszkanieMapper;

    private final MeldunekMapper meldunekMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MieszkanieDTO> findAll() {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MieszkanieDTO add(@RequestBody MieszkanieDTO mieszkanie) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.save(mieszkanieMapper.convertToEntity(mieszkanie)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MieszkanieDTO findById(@PathVariable Long id) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findById(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK) // powinno być OK przy zamianie i CREATE przy stworzeniu nowego
    public MieszkanieDTO replace(@RequestBody MieszkanieDTO newMieszkanie, @PathVariable Long id) {
        return mieszkanieMapper
                .convertToDTO(mieszkanieService.replace(mieszkanieMapper.convertToEntity(newMieszkanie), id));
    }

    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(mieszkanieService.findMeldunkiById(id));
    }

}
