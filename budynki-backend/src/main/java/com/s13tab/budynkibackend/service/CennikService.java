package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.repository.CennikRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CennikService {

    private final CennikRepository cennikRepository;

    public Cennik findById(long id) {
        return cennikRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return cennikRepository.count();
    }
    
}
