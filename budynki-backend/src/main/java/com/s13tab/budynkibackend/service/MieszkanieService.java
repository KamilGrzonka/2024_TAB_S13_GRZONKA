package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Cennik;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.MieszkanieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na mieszkaniach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MieszkanieService {

    private final MieszkanieRepository mieszkanieRepository;

    /**
     * Znajduje mieszkanie o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return mieszkanie o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli mieszkanie o podanym identyfikatorze nie istnieje
     */
    public Mieszkanie findById(long id) {
        return mieszkanieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie mieszkania.
     *
     * @return lista wszystkich mieszkań
     */
    public List<Mieszkanie> findAll() {
        return mieszkanieRepository.findAll();
    }

    /**
     * Zapisuje nowe mieszkanie.
     *
     * @param mieszkanie nowe mieszkanie do zapisania
     * @return zapisane mieszkanie
     */
    @Transactional
    public Mieszkanie save(Mieszkanie mieszkanie) {
        return mieszkanieRepository.save(mieszkanie);
    }

    /**
     * Aktualizuje mieszkanie o podanym identyfikatorze.
     *
     * @param newMieszkanie nowe dane mieszkania
     * @param id identyfikator mieszkania do aktualizacji
     * @return zaktualizowane mieszkanie
     */
    @Transactional
    public Mieszkanie replace(Mieszkanie newMieszkanie, Long id) {
        return mieszkanieRepository.findById(id).map(mieszkanie -> {
            mieszkanie.setNumerMieszkania(newMieszkanie.getNumerMieszkania());
            mieszkanie.setPietro(newMieszkanie.getPietro());
            mieszkanie.setLiczbaMieszkancow(newMieszkanie.getLiczbaMieszkancow());
            mieszkanie.setOpis(newMieszkanie.getOpis());
            mieszkanie.setBudynek(newMieszkanie.getBudynek());
            return save(mieszkanie);
        }).orElseGet(() -> {
            newMieszkanie.setId(id);
            return save(newMieszkanie);
        });
    }

    /**
     * Znajduje meldunki przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista meldunków przypisanych do mieszkania
     */
    public List<Meldunek> findMeldunkiById(Long id) {
        return findById(id).getMeldunki();
    }

    /**
     * Znajduje cenniki przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista cenników przypisanych do mieszkania
     */
    public List<Cennik> findCennikiById(Long id) {
        return findById(id).getCenniki();
    }

    /**
     * Znajduje zgłoszenia przypisane do mieszkania o podanym identyfikatorze.
     *
     * @param id identyfikator mieszkania
     * @return lista zgłoszeń przypisanych do mieszkania
     */
    public List<Zgloszenie> findZgloszeniaById(Long id) {
        return findById(id).getZgloszenia();
    }

    /**
     * Zlicza wszystkie mieszkania.
     *
     * @return liczba wszystkich mieszkań
     */
    public Long count() {
        return mieszkanieRepository.count();
    }

}
