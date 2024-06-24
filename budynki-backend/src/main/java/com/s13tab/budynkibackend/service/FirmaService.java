package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Firma;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.repository.FirmaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na firmach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FirmaService {

    private final FirmaRepository firmaRepository;

    /**
     * Znajduje firmę o podanym identyfikatorze.
     *
     * @param id identyfikator firmy
     * @return firma o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli firma o podanym identyfikatorze nie istnieje
     */
    public Firma findById(long id) {
        return firmaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie firmy.
     *
     * @return lista wszystkich firm
     */
    public List<Firma> findAll()
    {
        return firmaRepository.findAll();
    }

    /**
     * Zapisuje nową firmę.
     *
     * @param firma nowa firma do zapisania
     * @return zapisana firma
     */
    @Transactional
    public Firma save(Firma firma)
    {
        return firmaRepository.save(firma);
    }

    /**
     * Aktualizuje firmę o podanym identyfikatorze.
     *
     * @param newFirma nowe dane firmy
     * @param id identyfikator firmy do aktualizacji
     * @return zaktualizowana firma
     */
    @Transactional
    public Firma replace(Firma newFirma, Long id)
    {
        return firmaRepository.findById(id).map(firma -> {
            firma.setNazwa(newFirma.getNazwa());
            firma.setNip(newFirma.getNip());
            firma.setUlica(newFirma.getUlica());
            firma.setNumerBudynku(newFirma.getNumerBudynku());
            firma.setNumerLokalu(newFirma.getNumerLokalu());
            firma.setKodPocztowy(newFirma.getKodPocztowy());
            firma.setMiasto(newFirma.getMiasto());
            return save(firma);
        }).orElseGet(() -> {
            newFirma.setId(id);
            return save(newFirma);
        });
    }

    /**
     * Znajduje zadania przypisane do firmy o podanym identyfikatorze.
     *
     * @param id identyfikator firmy
     * @return lista zadań przypisanych do firmy
     */
    public List<Zadanie> findZadaniaById(Long id)
    {
        return findById(id).getZadania();
    }

    /**
     * Zlicza wszystkie firmy.
     *
     * @return liczba wszystkich firm
     */
    public Long count() {
        return firmaRepository.count();
    }
    
}
