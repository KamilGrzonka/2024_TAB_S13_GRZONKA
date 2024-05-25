package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Osoba;
import com.s13tab.budynkibackend.model.Umowa;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.OsobaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class OsobaService {

    private final OsobaRepository osobaRepository;

    public Osoba findById(long id) {
        return osobaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Osoba> findAll() {
        return osobaRepository.findAll();
    }

    @Transactional
    public Osoba save(Osoba osoba) {
        return osobaRepository.save(osoba);
    }

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

    public List<Meldunek> findMeldunkiById(Long id) {
        return findById(id).getMeldunki();
    }

    public List<Umowa> findUmowyById(Long id) {
        return findById(id).getUmowy();
    }

    public List<Zgloszenie> findZgloszeniaById(Long id) {
        return findById(id).getZgloszenia();
    }

    public Long count() {
        return osobaRepository.count();
    }

}
