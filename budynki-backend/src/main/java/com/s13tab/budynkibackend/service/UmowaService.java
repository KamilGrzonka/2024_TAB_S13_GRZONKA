package com.s13tab.budynkibackend.service;

import java.util.List;

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

    public List<Umowa> findAll()
    {
        return umowaRepository.findAll();
    }

    @Transactional
    public Umowa save(Umowa umowa)
    {
        return umowaRepository.save(umowa);
    }

    @Transactional
    public Umowa replace(Umowa newUmowa, Long id)
    {
        return umowaRepository.findById(id).map(umowa -> {
            umowa.setDataZawarcia(newUmowa.getDataZawarcia());
            umowa.setCennik(newUmowa.getCennik());
            umowa.setOsoba(newUmowa.getOsoba());
            return save(umowa);
        }).orElseGet(() -> {
            newUmowa.setId(id);
            return save(newUmowa);
        });
    }

    public Long count() {
        return umowaRepository.count();
    }
    
}
