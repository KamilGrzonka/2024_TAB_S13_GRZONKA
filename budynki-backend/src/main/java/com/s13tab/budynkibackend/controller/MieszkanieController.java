package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.repository.MieszkanieRepository;
import com.s13tab.budynkibackend.repository.OsobaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;

public class MieszkanieController {

    private final MieszkanieRepository repository;

    public MieszkanieController(MieszkanieRepository repository) {
        this.repository = repository;
    }

    @GetMapping("api/mieszkania")
    public Iterable<Mieszkanie> findAll() {return repository.findAll();}

    @GetMapping("api/mieszkania/meldunki/{id}")
    public List<Meldunek> findMeldunkiById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow().getMeldunki();
    }
}
