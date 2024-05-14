package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.repository.MeldunekRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MeldunekService {

    private final MeldunekRepository meldunekRepository;

    public Meldunek findById(long id) {
        return meldunekRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Meldunek> findAll() {
        return meldunekRepository.findAll();
    }

    @Transactional
    public Meldunek save(Meldunek meldunek) {
        return meldunekRepository.save(meldunek);
    }
    
    @Transactional
    public Meldunek replace(Meldunek newMeldunek, Long id) {
        return meldunekRepository.findById(id).map(meldunek -> {
            meldunek.setDataMeldunku(newMeldunek.getDataMeldunku());
            meldunek.setDataWymeldowania(newMeldunek.getDataWymeldowania());
            meldunek.setOsoba(newMeldunek.getOsoba());
            meldunek.setMieszkanie(newMeldunek.getMieszkanie());
            return save(meldunek);
        }).orElseGet(() -> {
            newMeldunek.setId(id);
            return save(newMeldunek);
        });
    }

    public Long count() {
        return meldunekRepository.count();
    }

}
