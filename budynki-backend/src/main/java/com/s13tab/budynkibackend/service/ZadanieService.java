package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.repository.ZadanieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ZadanieService {

    private final ZadanieRepository zadanieRepository;

    public Zadanie findById(long id) {
        return zadanieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Zadanie> findAll()
    {
        return zadanieRepository.findAll();
    }

    @Transactional
    public Zadanie save(Zadanie zadanie)
    {
        return zadanieRepository.save(zadanie);
    }

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

    public Long count() {
        return zadanieRepository.count();
    }

}
