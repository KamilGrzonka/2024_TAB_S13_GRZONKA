package com.s13tab.budynkibackend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.ZgloszenieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZgloszenieService {

    private final ZgloszenieRepository zgloszenieRepository;

    public Zgloszenie findById(long id) {
        return zgloszenieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Long count() {
        return zgloszenieRepository.count();
    }

}
