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

import com.s13tab.budynkibackend.dto.UmowaDTO;
import com.s13tab.budynkibackend.mapper.UmowaMapper;
import com.s13tab.budynkibackend.service.UmowaService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Validated
@RequestMapping("/api/umowy")
@RestController
public class UmowaController {

    private final UmowaService umowaService;
    private final UmowaMapper umowaMapper;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<UmowaDTO> findAll()
    {
        return umowaMapper.convertToDTO(umowaService.findAll());
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UmowaDTO findById(@PathVariable Long id)
    {
        return umowaMapper.convertToDTO(umowaService.findById(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UmowaDTO add(@RequestBody UmowaDTO umowaDTO)
    {
        return umowaMapper.convertToDTO(umowaService.save(umowaMapper.convertToEntity(umowaDTO)));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UmowaDTO replace(@RequestBody UmowaDTO newUmowa ,@PathVariable Long id)
    {
        return umowaMapper.convertToDTO(umowaService.replace(umowaMapper.convertToEntity(newUmowa), id));
    }

}
