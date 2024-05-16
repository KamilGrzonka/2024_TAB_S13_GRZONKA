package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Firma;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.repository.FirmaRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class FirmaService {

    private final FirmaRepository firmaRepository;

    public Firma findById(long id) {
        return firmaRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Firma> findAll()
    {
        return firmaRepository.findAll();
    }

    @Transactional
    public Firma save(Firma firma)
    {
        return firmaRepository.save(firma);
    }

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

    public List<Zadanie> findZadaniaById(Long id)
    {
        return findById(id).getZadania();
    }

    public Long count() {
        return firmaRepository.count();
    }
    
}
