package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.repository.MeldunekRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
public class MeldunekController {

    private final MeldunekRepository repository;

    public MeldunekController(MeldunekRepository repository){this.repository = repository;}

    @GetMapping("api/meldunki")
    public Iterable<Meldunek> findAll(){return repository.findAll();}

    @GetMapping("api/meldunki/{id}")
    public Meldunek findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "meldunek"));
    }

    @PostMapping("api/meldunki")
    public Meldunek add(@RequestBody Meldunek meldunek) {
        return repository.save(meldunek);
    }

    @PutMapping("api/meldunki/{id}")
    public Meldunek replace(@RequestBody Meldunek newMeldunek, @PathVariable Integer numerMeldunku) {
        return repository.findById(numerMeldunku).map(meldunek -> {
                    meldunek.setDataMeldunku(newMeldunek.getDataMeldunku());
                    meldunek.setDataWymeldowania(newMeldunek.getDataWymeldowania());
                    meldunek.setStatusMeldunku(newMeldunek.getStatusMeldunku());
                    meldunek.setMieszkanie(newMeldunek.getMieszkanie());
                    meldunek.setOsoba(newMeldunek.getOsoba());
                    return repository.save(meldunek);
                })
                .orElseGet(() -> {
                    newMeldunek.setNumerMeldunku(numerMeldunku);
                    return repository.save(newMeldunek);
                });
    }

}
