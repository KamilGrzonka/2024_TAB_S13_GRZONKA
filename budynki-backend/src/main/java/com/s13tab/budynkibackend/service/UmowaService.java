package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Umowa;
import com.s13tab.budynkibackend.repository.UmowaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UmowaService {

    private final UmowaRepository umowaRepository;

    public Umowa findById(long id) {
        return umowaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return umowaRepository.count();
    }
    
}
