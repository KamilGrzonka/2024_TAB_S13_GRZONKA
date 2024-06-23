package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.service.MieszkanieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.CennikMapper;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;

@RequiredArgsConstructor
@RequestMapping("/api/mieszkania")
@RestController
public class MieszkanieController {

    private final MieszkanieService mieszkanieService;

    private final MieszkanieMapper mieszkanieMapper;
    private final MeldunekMapper meldunekMapper;
    private final CennikMapper cennikMapper;
    private final ZgloszenieMapper zgloszenieMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MieszkanieDTO> findAll() {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findAll());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MieszkanieDTO add(@RequestBody @Valid MieszkanieDTO mieszkanie) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.save(mieszkanieMapper.convertToEntity(mieszkanie)));
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MieszkanieDTO findById(@PathVariable Long id) {
        return mieszkanieMapper.convertToDTO(mieszkanieService.findById(id));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public MieszkanieDTO replace(@RequestBody @Valid MieszkanieDTO newMieszkanie, @PathVariable Long id) {
        return mieszkanieMapper
                .convertToDTO(mieszkanieService.replace(mieszkanieMapper.convertToEntity(newMieszkanie), id));
    }

    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(mieszkanieService.findMeldunkiById(id));
    }

    @GetMapping("/{id}/cenniki")
    @ResponseStatus(HttpStatus.OK)
    public List<CennikDTO> findCennikiById(@PathVariable Long id) {
        return cennikMapper.convertToDTO(mieszkanieService.findCennikiById(id));
    }

    @GetMapping("/{id}/zgloszenia")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findZgloszeniaById(@PathVariable Long id) {
        return zgloszenieMapper.convertToDTO(mieszkanieService.findZgloszeniaById(id));
    }

}
