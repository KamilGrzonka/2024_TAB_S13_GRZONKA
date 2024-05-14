package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Firma;
import com.s13tab.budynkibackend.repository.FirmaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FirmaService {

    private final FirmaRepository firmaRepository;

    public Firma findById(long id) {
        return firmaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return firmaRepository.count();
    }
    
}
