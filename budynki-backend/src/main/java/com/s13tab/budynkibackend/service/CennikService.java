package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.repository.CennikRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na cennikach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CennikService {

    private final CennikRepository cennikRepository;

    /**
     * Znajduje cennik o podanym identyfikatorze.
     *
     * @param id identyfikator cennika
     * @return cennik o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli cennik o podanym identyfikatorze nie istnieje
     */
    public Cennik findById(long id) {
        return cennikRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie cenniki.
     *
     * @return lista wszystkich cenników
     */
    public List<Cennik> findAll() {
        return cennikRepository.findAll();
    }

    /**
     * Zapisuje nowy cennik.
     *
     * @param cennik nowy cennik do zapisania
     * @return zapisany cennik
     */
    @Transactional
    public Cennik save(Cennik cennik) {
        return cennikRepository.save(cennik);
    }

    /**
     * Aktualizuje cennik o podanym identyfikatorze.
     *
     * @param newCennik nowe dane cennika
     * @param id identyfikator cennika do aktualizacji
     * @return zaktualizowany cennik
     */
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

    /**
     * Zlicza wszystkie cenniki.
     *
     * @return liczba wszystkich cenników
     */
    public Long count() {
        return cennikRepository.count();
    }
    
}
