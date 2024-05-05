package com.s13tab.budynkibackend.controller;

import java.math.BigDecimal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.repository.OsobaRepository;

@RestController
public class OsobaController {
    private final OsobaRepository repository;

    public OsobaController(OsobaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("api/osoby")
    public Iterable<Osoba> findAll() {
        return repository.findAll();
    }

    @GetMapping("api/osoby/{pesel}")
    public Osoba findById(@PathVariable BigDecimal pesel) {
        return repository.findById(pesel).orElseThrow(() -> new BudynkiEntityNotFoundException(pesel, "osoba"));
    }

    @PutMapping("api/osoby/{pesel}")
    public Osoba replace(@RequestBody Osoba newOsoba, @PathVariable BigDecimal pesel) {
        return repository.findById(pesel).map(osoba -> {
            osoba.setImieINazwisko(newOsoba.getImieINazwisko());
            osoba.setNajmujacy(newOsoba.getNajmujacy());
            return repository.save(osoba);
        })
                .orElseGet(() -> {
                    newOsoba.setPesel(pesel);
                    return repository.save(newOsoba);
                });
    }
}
