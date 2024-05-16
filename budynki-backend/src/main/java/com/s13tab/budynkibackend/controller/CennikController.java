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

import com.s13tab.budynkibackend.dto.CennikDTO;
import com.s13tab.budynkibackend.mapper.CennikMapper;
import com.s13tab.budynkibackend.service.CennikService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/cenniki")
@RestController
public class CennikController {
    
    private final CennikMapper cennikMapper;
    private final CennikService cennikService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<CennikDTO> findAll()
    {
        return cennikMapper.convertToDTO(cennikService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CennikDTO findById(@PathVariable Long id)
    {
        return cennikMapper.convertToDTO(cennikService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CennikDTO add(@RequestBody CennikDTO newCennik)
    {
        return cennikMapper.convertToDTO(cennikService.save(cennikMapper.convertToEntity(newCennik)));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public CennikDTO replace(@RequestBody CennikDTO newCennik, @PathVariable Long id)
    {
        return cennikMapper.convertToDTO(cennikService.replace(cennikMapper.convertToEntity(newCennik), id));
    }


}
