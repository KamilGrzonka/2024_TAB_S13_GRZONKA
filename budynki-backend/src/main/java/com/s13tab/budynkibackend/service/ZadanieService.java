package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.repository.ZadanieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na zadaniach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZadanieService {

    private final ZadanieRepository zadanieRepository;

    /**
     * Znajduje zadanie o podanym identyfikatorze.
     *
     * @param id identyfikator zadania
     * @return zadanie o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli zadanie o podanym identyfikatorze nie istnieje
     */
    public Zadanie findById(long id) {
        return zadanieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie zadania.
     *
     * @return lista wszystkich zadań
     */
    public List<Zadanie> findAll()
    {
        return zadanieRepository.findAll();
    }

    /**
     * Zapisuje nowe zadanie.
     *
     * @param zadanie nowe zadanie do zapisania
     * @return zapisane zadanie
     */
    @Transactional
    public Zadanie save(Zadanie zadanie)
    {
        return zadanieRepository.save(zadanie);
    }

    /**
     * Aktualizuje zadanie o podanym identyfikatorze.
     *
     * @param newZadanie nowe dane zadania
     * @param id identyfikator zadania do aktualizacji
     * @return zaktualizowane zadanie
     */
    @Transactional
    public Zadanie replace(Zadanie newZadanie, Long id)
    {
        return zadanieRepository.findById(id).map(zadanie -> {
            zadanie.setKoszt(newZadanie.getKoszt());
            zadanie.setOpis(newZadanie.getOpis());
            zadanie.setDataRozpoczecia(newZadanie.getDataRozpoczecia());
            zadanie.setDataZakonczenia(newZadanie.getDataZakonczenia());
            zadanie.setFirma(newZadanie.getFirma());
            zadanie.setZgloszenie(newZadanie.getZgloszenie());
            return save(zadanie);
        }).orElseGet(() -> {
            newZadanie.setId(id);
            return save(newZadanie);
        });
    }

    /**
     * Zlicza wszystkie zadania.
     *
     * @return liczba wszystkich zadań
     */
    public Long count() {
        return zadanieRepository.count();
    }

}
