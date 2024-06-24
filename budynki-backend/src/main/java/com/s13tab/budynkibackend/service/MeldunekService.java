package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.repository.MeldunekRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na meldunkach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MeldunekService {

    private final MeldunekRepository meldunekRepository;

    /**
     * Znajduje meldunek o podanym identyfikatorze.
     *
     * @param id identyfikator meldunku
     * @return meldunek o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli meldunek o podanym identyfikatorze nie istnieje
     */
    public Meldunek findById(long id) {
        return meldunekRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie meldunki.
     *
     * @return lista wszystkich meldunków
     */
    public List<Meldunek> findAll() {
        return meldunekRepository.findAll();
    }

    /**
     * Zapisuje nowy meldunek.
     *
     * @param meldunek nowy meldunek do zapisania
     * @return zapisany meldunek
     */
    @Transactional
    public Meldunek save(Meldunek meldunek) {
        return meldunekRepository.save(meldunek);
    }

    /**
     * Aktualizuje meldunek o podanym identyfikatorze.
     *
     * @param newMeldunek nowe dane meldunku
     * @param id identyfikator meldunku do aktualizacji
     * @return zaktualizowany meldunek
     */
    @Transactional
    public Meldunek replace(Meldunek newMeldunek, Long id) {
        return meldunekRepository.findById(id).map(meldunek -> {
            meldunek.setDataMeldunku(newMeldunek.getDataMeldunku());
            meldunek.setDataWymeldowania(newMeldunek.getDataWymeldowania());
            meldunek.setWynajmujacy(newMeldunek.isWynajmujacy());
            meldunek.setOsoba(newMeldunek.getOsoba());
            meldunek.setMieszkanie(newMeldunek.getMieszkanie());
            return save(meldunek);
        }).orElseGet(() -> {
            newMeldunek.setId(id);
            return save(newMeldunek);
        });
    }

    /**
     * Zlicza wszystkie meldunki.
     *
     * @return liczba wszystkich meldunków
     */
    public Long count() {
        return meldunekRepository.count();
    }

}
