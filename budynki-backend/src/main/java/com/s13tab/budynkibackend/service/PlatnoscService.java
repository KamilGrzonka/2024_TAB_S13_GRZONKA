package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.repository.PlatnoscRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlatnoscService {

    private final PlatnoscRepository platnoscRepository;

    public Platnosc findById(long id) {
        return platnoscRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Platnosc> findAll()
    {
        return platnoscRepository.findAll();
    }

    @Transactional
    public Platnosc save(Platnosc platnosc)
    {
        return platnoscRepository.save(platnosc);
    }

    @Transactional
    public Platnosc replace(Platnosc newPlatnosc, Long id)
    {
        return platnoscRepository.findById(id).map(platnosc -> {
            platnosc.setDataZrealizowania(newPlatnosc.getDataZrealizowania());
            platnosc.setWartosc(newPlatnosc.getWartosc());
            platnosc.setZadanie(newPlatnosc.getZadanie());
            platnosc.setUmowa(newPlatnosc.getUmowa());
            return save(platnosc);
        }).orElseGet(() -> {
            newPlatnosc.setId(id);
            return save(newPlatnosc);
        });
    }

    public Long count() {
        return platnoscRepository.count();
    }
    
}
