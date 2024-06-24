package com.s13tab.budynkibackend.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.dto.ZgloszeniaWyswietlDTO;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.ZgloszenieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na zgłoszeniach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZgloszenieService {

    private final ZgloszenieRepository zgloszenieRepository;

    /**
     * Znajduje zgłoszenie o podanym identyfikatorze.
     *
     * @param id identyfikator zgłoszenia
     * @return zgłoszenie o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli zgłoszenie o podanym identyfikatorze nie istnieje
     */
    public Zgloszenie findById(long id) {
        return zgloszenieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie zgłoszenia.
     *
     * @return lista wszystkich zgłoszeń
     */
    public List<Zgloszenie> findAll()
    {
        return zgloszenieRepository.findAll();
    }

    /**
     * Zapisuje nowe zgłoszenie.
     *
     * @param newZgloszenie nowe zgłoszenie do zapisania
     * @return zapisane zgłoszenie
     */
    @Transactional
    public Zgloszenie save(Zgloszenie newZgloszenie)
    {
        return zgloszenieRepository.save(newZgloszenie);
    }

    /**
     * Aktualizuje zgłoszenie o podanym identyfikatorze.
     *
     * @param newZgloszenie nowe dane zgłoszenia
     * @param id            identyfikator zgłoszenia do aktualizacji
     * @return zaktualizowane zgłoszenie
     */
    @Transactional
    public Zgloszenie replace(Zgloszenie newZgloszenie, Long id)
    {
        return zgloszenieRepository.findById(id).map(zgloszenie -> {
            zgloszenie.setDataZgloszenia(newZgloszenie.getDataZgloszenia());
            zgloszenie.setStatusZgloszenia(newZgloszenie.getStatusZgloszenia());
            zgloszenie.setTypZgloszenia(newZgloszenie.getTypZgloszenia());
            zgloszenie.setPriorytet(newZgloszenie.getPriorytet());
            zgloszenie.setOpis(newZgloszenie.getOpis());
            zgloszenie.setOsoba(newZgloszenie.getOsoba());
            zgloszenie.setMieszkanie(newZgloszenie.getMieszkanie());
            zgloszenie.setBudynek(newZgloszenie.getBudynek());
            return save(zgloszenie);
        }).orElseGet(() -> {
            newZgloszenie.setId(id);
            return save(newZgloszenie);
        });
    }

    /**
     * Znajduje zadania przypisane do zgłoszenia o podanym identyfikatorze.
     *
     * @param id identyfikator zgłoszenia
     * @return lista zadań przypisanych do zgłoszenia
     */
    public List<Zadanie> findZadaniaById(Long id)
    {
        return findById(id).getZadania();
    }

    /**
     * Znajduje osobę przypisaną do zgłoszenia o podanym identyfikatorze.
     *
     * @param id identyfikator zgłoszenia
     * @return osoba przypisana do zgłoszenia
     */
    public Osoba findOsobaById(Long id)
    {
        return findById(id).getOsoba();
    }

    /**
     * Znajduje szczegóły zgłoszenia do wyświetlenia.
     *
     * @param id identyfikator zgłoszenia
     * @return obiekt DTO zawierający szczegóły zgłoszenia do wyświetlenia
     */
    public ZgloszeniaWyswietlDTO findZgloszenieToDisplayById(Long id)
    {
        Zgloszenie zgloszenie = findById(id);
        Osoba osoba = zgloszenie.getOsoba();
        Long osobaId = null;
        String imie = null;
        String nazwisko = null;
        if(osoba != null)
        {
            osobaId = osoba.getId();
            imie = osoba.getImie();
            nazwisko = osoba.getNazwisko();
        }
        Mieszkanie mieszkanie = zgloszenie.getMieszkanie();
        Long mieszkanieId = null;
        Integer numerMieszkania = null;
        if(mieszkanie != null)
        {
            mieszkanieId = mieszkanie.getId();
            numerMieszkania = mieszkanie.getNumerMieszkania();
        }
        return new ZgloszeniaWyswietlDTO(zgloszenie.getId(), osobaId, mieszkanieId,
                zgloszenie.getBudynek().getId(), numerMieszkania,
                imie, nazwisko, zgloszenie.getDataZgloszenia(),
                zgloszenie.getStatusZgloszenia(), zgloszenie.getTypZgloszenia(), zgloszenie.getPriorytet(),
                zgloszenie.getOpis(), findDataWykonania(id),
                findKosztCalkowity(id));
    }

    /**
     * Znajduje datę wykonania ostatniego zadania przypisanego do zgłoszenia.
     *
     * @param id identyfikator zgłoszenia
     * @return data wykonania ostatniego zadania lub null, jeśli ostatnie zadanie nie zostało wykonane
     */
    public Date findDataWykonania(Long id)
    {
        List<Zadanie> zadania = findById(id).getZadania();
        if(zadania.stream().anyMatch(zadanie -> zadanie.getDataZakonczenia() == null))
        {
            return null;
        }
        Date dataWykonania = zadania.stream().map(Zadanie::getDataZakonczenia).max(Date::compareTo).orElse(null);
        return dataWykonania;
    }

    /**
     * Znajduje całkowity koszt wszystkich zadań przypisanych do zgłoszenia.
     *
     * @param id identyfikator zgłoszenia
     * @return całkowity koszt zadań przypisanych do zgłoszenia
     */
    public BigDecimal findKosztCalkowity(Long id)
    {
        List<Zadanie> zadania = findById(id).getZadania();
        BigDecimal kosztCalkowity = zadania.stream().map(Zadanie::getKoszt).reduce(BigDecimal.ZERO, BigDecimal::add);
        return kosztCalkowity;
    }

    /**
     * Zlicza wszystkie zgłoszenia.
     *
     * @return liczba wszystkich zgłoszeń
     */
    public Long count() {
        return zgloszenieRepository.count();
    }

}
