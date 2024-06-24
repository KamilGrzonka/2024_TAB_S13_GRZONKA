package com.s13tab.budynkibackend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.repository.PlatnoscRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

/**
 * Usługa obsługująca operacje na płatnościach.
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlatnoscService {

    private final PlatnoscRepository platnoscRepository;

    /**
     * Znajduje płatność o podanym identyfikatorze.
     *
     * @param id identyfikator płatności
     * @return płatność o podanym identyfikatorze
     * @throws EntityNotFoundException jeśli płatność o podanym identyfikatorze nie istnieje
     */
    public Platnosc findById(long id) {
        return platnoscRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    /**
     * Znajduje wszystkie płatności.
     *
     * @return lista wszystkich płatności
     */
    public List<Platnosc> findAll()
    {
        return platnoscRepository.findAll();
    }

    /**
     * Zapisuje nową płatność.
     *
     * @param platnosc nowa płatność do zapisania
     * @return zapisana płatność
     */
    @Transactional
    public Platnosc save(Platnosc platnosc)
    {
        return platnoscRepository.save(platnosc);
    }

    /**
     * Aktualizuje płatność o podanym identyfikatorze.
     *
     * @param newPlatnosc nowe dane płatności
     * @param id identyfikator płatności do aktualizacji
     * @return zaktualizowana płatność
     */
    @Transactional
    public Platnosc replace(Platnosc newPlatnosc, Long id)
    {
        return platnoscRepository.findById(id).map(platnosc -> {
            platnosc.setDataZrealizowania(newPlatnosc.getDataZrealizowania());
            platnosc.setWartosc(newPlatnosc.getWartosc());
            platnosc.setZadanie(newPlatnosc.getZadanie());
            platnosc.setMeldunek(newPlatnosc.getMeldunek());
            return save(platnosc);
        }).orElseGet(() -> {
            newPlatnosc.setId(id);
            return save(newPlatnosc);
        });
    }

    /**
     * Zlicza wszystkie płatności.
     *
     * @return liczba wszystkich płatności
     */
    public Long count() {
        return platnoscRepository.count();
    }
    
}
