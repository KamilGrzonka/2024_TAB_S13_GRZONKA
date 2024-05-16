package com.s13tab.budynkibackend.service;

import java.util.List;

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

    public List<Cennik> findAll() {
        return cennikRepository.findAll();
    }

    @Transactional
    public Cennik save(Cennik cennik) {
        return cennikRepository.save(cennik);
    }

    @Transactional
    public Cennik replace(Cennik newCennik, Long id) {
        return cennikRepository.findById(id).map(cennik -> {
            cennik.setCena(newCennik.getCena());
            cennik.setDataPoczatkowa(newCennik.getDataPoczatkowa());
            cennik.setDataKoncowa(newCennik.getDataKoncowa());
            cennik.setMieszkanie(newCennik.getMieszkanie());
            return save(cennik);
        }).orElseGet(() -> {
            newCennik.setId(id);
            return save(newCennik);
        });
    }
    
}
