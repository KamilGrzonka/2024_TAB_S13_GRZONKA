package com.s13tab.budynkibackend.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.repository.OsobaRepository;

public class OsobaController {
    private final OsobaRepository repository;

    public OsobaController(OsobaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("api/osoby")
    public Iterable<Osoba> findAll() {
        return repository.findAll();
    }

    @PostMapping("api/osoby")
    public Osoba add(@RequestBody Osoba osoba) {
        return repository.save(osoba);
    }

    @GetMapping("api/osoby/{id}")
    public Osoba findById(@PathVariable BigDecimal id) {
        return repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "osoba"));
    }

    @PutMapping("api/osoby/{id}")
    public Osoba replace(@RequestBody Osoba newOsoba, @PathVariable BigDecimal pesel) {
        return repository.findById(pesel).map(osoba -> {
            osoba.setImieINazwisko(newOsoba.getImieINazwisko());
            osoba.setNajmujacy(newOsoba.getNajmujacy());
            osoba.setPesel(newOsoba.getPesel());
            return repository.save(osoba);
        })
        .orElseGet(() -> {
            newOsoba.setPesel(pesel);
            return repository.save(newOsoba);
        });
    }
}
