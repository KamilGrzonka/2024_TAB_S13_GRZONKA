package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.repository.PlatnoscRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlatnoscService {

    private final PlatnoscRepository platnoscRepository;

    public Platnosc findById(long id) {
        return platnoscRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return platnoscRepository.count();
    }
    
}
