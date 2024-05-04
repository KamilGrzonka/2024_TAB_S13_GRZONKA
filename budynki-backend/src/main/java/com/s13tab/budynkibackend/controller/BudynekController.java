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
    private final BudynekRepository budynekRepository;

    public BudynekController(BudynekRepository budynekRepository) {
        this.budynekRepository = budynekRepository;
    }

    @GetMapping("api/budynki")
    public Iterable<Budynek> findAllBudynki() {
        return this.budynekRepository.findAll();
    }
    
    @PostMapping("api/budynki")
    public Budynek postMethodName(@RequestBody Budynek budynek) {
        return this.budynekRepository.save(budynek);
    }
    
    @GetMapping("api/budynki/{id}")
    public Budynek findById(@PathVariable Integer id) {
        return this.budynekRepository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "budynek"));
    }
}
