package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.repository.BudynekRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BudynekService {

    private final BudynekRepository budynekRepository;

    public Budynek findById(long id) {
        return budynekRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Budynek> findAll() {
        return budynekRepository.findAll();
    }

    @Transactional
    public Budynek save(Budynek budynek) {
        return budynekRepository.save(budynek);
    }

    public List<Mieszkanie> findMieszkaniaById(Long id) {
        return findById(id).getMieszkania();
    }

    public Long count() {
        return budynekRepository.count();
    }

}
