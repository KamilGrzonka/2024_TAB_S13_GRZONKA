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

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZgloszenieService {

    private final ZgloszenieRepository zgloszenieRepository;

    public Zgloszenie findById(long id) {
        return zgloszenieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Zgloszenie> findAll()
    {
        return zgloszenieRepository.findAll();
    }

    @Transactional
    public Zgloszenie save(Zgloszenie newZgloszenie)
    {
        return zgloszenieRepository.save(newZgloszenie);
    }

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

    public List<Zadanie> findZadaniaById(Long id)
    {
        return findById(id).getZadania();
    }

    public Long count() {
        return zgloszenieRepository.count();
    }

    public Osoba findOsobaById(Long id)
    {
        return findById(id).getOsoba();
    }

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

    public BigDecimal findKosztCalkowity(Long id)
    {
        List<Zadanie> zadania = findById(id).getZadania();
        BigDecimal kosztCalkowity = zadania.stream().map(Zadanie::getKoszt).reduce(BigDecimal.ZERO, BigDecimal::add);
        return kosztCalkowity;
    }

}
