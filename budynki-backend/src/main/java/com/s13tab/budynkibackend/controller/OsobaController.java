package com.s13tab.budynkibackend.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.StreamSupport;

import com.s13tab.budynkibackend.model.Meldunek;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.dto.MeldunekDto;
import com.s13tab.budynkibackend.model.dto.OsobaDto;
import com.s13tab.budynkibackend.repository.OsobaRepository;

@RestController
public class OsobaController {
    private final OsobaRepository repository;

    public OsobaController(OsobaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("api/osoby")
    public Iterable<OsobaDto> findAll() {
        return StreamSupport.stream(repository.findAll().spliterator(), false).toList()
        .stream().map(osoba -> convertToDto(osoba)).toList();
    }

    @GetMapping("api/osoby/{pesel}")
    public OsobaDto findById(@PathVariable BigDecimal pesel) {
        return convertToDto(repository.findById(pesel).orElseThrow(() -> new BudynkiEntityNotFoundException(pesel, "osoba")));
    }

    @PostMapping("api/osoby")
    public OsobaDto add(@RequestBody OsobaDto osoba)
    {
        return convertToDto(repository.save(convertToEntity(osoba)));
    }

    @PutMapping("api/osoby/{pesel}")
    public OsobaDto replace(@RequestBody Osoba newOsoba, @PathVariable BigDecimal pesel) {
        return convertToDto(repository.findById(pesel).map(osoba -> {
            osoba.setImieINazwisko(newOsoba.getImieINazwisko());
            osoba.setNajmujacy(newOsoba.getNajmujacy());
            return repository.save(osoba);
        })
                .orElseGet(() -> {
                    newOsoba.setPesel(pesel);
                    return repository.save(newOsoba);
                }));
    }

    @GetMapping("api/osoby/meldunki/{id}")
    public List<MeldunekDto> findMeldunkiById(@PathVariable BigDecimal id){
        return repository.findById(id).orElseThrow().getMeldunki()
        .stream()
        .map(meldunek -> convertToDto(meldunek)).toList();
    }

    private Osoba convertToEntity(OsobaDto osobaDto)
    {
        return new Osoba(osobaDto.pesel(), osobaDto.imieINazwisko(), osobaDto.najmujacy(), null);
    }

    private OsobaDto convertToDto(Osoba osoba)
    {
        return new OsobaDto(osoba.getPesel(),osoba.getImieINazwisko(), osoba.getNajmujacy());
    }

     private MeldunekDto convertToDto(Meldunek meldunek)
    {
        return new MeldunekDto(meldunek.getNumerMeldunku(), meldunek.getDataMeldunku(), 
        meldunek.getDataWymeldowania(),
         meldunek.getStatusMeldunku(),
          meldunek.getOsoba().getPesel(),
           meldunek.getMieszkanie().getNumerMieszkania());
    }

}
