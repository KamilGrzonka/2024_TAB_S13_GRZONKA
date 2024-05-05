package com.s13tab.budynkibackend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.repository.BudynekRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class BudynekController {
    private final BudynekRepository repository;

    public BudynekController(BudynekRepository repository) {
        this.repository = repository;
    }

    @GetMapping("api/budynki")
    public Iterable<Budynek> findAll() {
        return repository.findAll();
    }

    @PostMapping("api/budynki")
    public Budynek add(@RequestBody Budynek budynek) {
        return repository.save(budynek);
    }

    @GetMapping("api/budynki/{id}")
    public Budynek findById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "budynek"));
    }
}
