package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.OsobaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na osobach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class OsobaService {

    private final OsobaRepository osobaRepository;

    /**
     * Znajduje osobę o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return osoba o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli osoba o podanym identyfikatorze nie istnieje
     */
    public Osoba findById(long id) {
        return osobaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie osoby.
     *
     * @return lista wszystkich osób
     */
    public List<Osoba> findAll() {
        return osobaRepository.findAll();
    }

    /**
     * Zapisuje nową osobę.
     *
     * @param osoba nowa osoba do zapisania
     * @return zapisana osoba
     */
    @Transactional
    public Osoba save(Osoba osoba) {
        return osobaRepository.save(osoba);
    }

    /**
     * Aktualizuje osobę o podanym identyfikatorze.
     *
     * @param newOsoba nowe dane osoby
     * @param id identyfikator osoby do aktualizacji
     * @return zaktualizowana osoba
     */
    @Transactional
    public Osoba replace(Osoba newOsoba, Long id) {
        return osobaRepository.findById(id).map(osoba -> {
            osoba.setPesel(newOsoba.getPesel());
            osoba.setImie(newOsoba.getImie());
            osoba.setNazwisko(newOsoba.getNazwisko());
            return save(osoba);
        }).orElseGet(() -> {
            newOsoba.setId(id);
            return save(newOsoba);
        });
    }

    /**
     * Znajduje meldunki przypisane do osoby o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return lista meldunków przypisanych do osoby
     */
    public List<Meldunek> findMeldunkiById(Long id) {
        return findById(id).getMeldunki();
    }

    /**
     * Znajduje zgłoszenia przypisane do osoby o podanym identyfikatorze.
     *
     * @param id identyfikator osoby
     * @return lista zgłoszeń przypisanych do osoby
     */
    public List<Zgloszenie> findZgloszeniaById(Long id) {
        return findById(id).getZgloszenia();
    }

    /**
     * Zlicza wszystkie osoby.
     *
     * @return liczba wszystkich osób
     */
    public Long count() {
        return osobaRepository.count();
    }

}
