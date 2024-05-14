package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.repository.ZadanieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZadanieService {

    private final ZadanieRepository zadanieRepository;

    public Zadanie findById(long id) {
        return zadanieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return zadanieRepository.count();
    }

}
