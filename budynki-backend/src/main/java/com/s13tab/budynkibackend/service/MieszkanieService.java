package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.repository.MieszkanieRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MieszkanieService {

    private final MieszkanieRepository mieszkanieRepository;

    public Mieszkanie findById(long id) {
        return mieszkanieRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Mieszkanie> findAll() {
        return mieszkanieRepository.findAll();
    }

    @Transactional
    public Mieszkanie save(Mieszkanie mieszkanie) {
        return mieszkanieRepository.save(mieszkanie);
    }

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

    public List<Meldunek> findMeldunkiById(Long id) {
        return findById(id).getMeldunki();
    }

    public Long count() {
        return mieszkanieRepository.count();
    }

}
