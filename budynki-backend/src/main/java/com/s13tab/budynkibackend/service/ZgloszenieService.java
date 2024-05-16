package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
            zgloszenie.setDataWykonania(newZgloszenie.getDataWykonania());
            zgloszenie.setStatusZgloszenia(newZgloszenie.getStatusZgloszenia());
            zgloszenie.setTypZgloszenia(newZgloszenie.getTypZgloszenia());
            zgloszenie.setKosztCalkowity(newZgloszenie.getKosztCalkowity());
            zgloszenie.setPriorytet(newZgloszenie.getPriorytet());
            zgloszenie.setMeldunek(newZgloszenie.getMeldunek());
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

}
