package com.s13tab.budynkibackend.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.Platnosc;
import com.s13tab.budynkibackend.model.Zadanie;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.repository.BudynekRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class BudynekService {

    private final BudynekRepository budynekRepository;

    public Budynek findById(long id) {
        return budynekRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Budynek> findAll() {
        return budynekRepository.findAll();
    }

    @Transactional
    public Budynek save(Budynek budynek) {
        return budynekRepository.save(budynek);
    }

    public List<Mieszkanie> findMieszkaniaById(Long id) {
        return findById(id).getMieszkania();
    }

    public List<Zgloszenie> findZgloszeniaById(Long id) {
        return findById(id).getZgloszenia();
    }

    public List<Zadanie> findZadaniaById(Long id) {
        return findById(id).getZgloszenia().stream().map(zgloszenie -> zgloszenie.getZadania()).flatMap(List::stream).toList();
    }
    
    public List<Platnosc> findPlatnosciById(Long id) {
        List<Platnosc> platnosciWychodzace = findZadaniaById(id).stream().map(zadanie -> zadanie.getPlatnosci())
                .flatMap(List::stream).toList();
        List<Platnosc> platnosciPrzychodzace = findMieszkaniaById(id).stream()
                .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream)
                .map(meldunek -> meldunek.getPlatnosci()).flatMap(List::stream).toList();
        return Stream.concat(platnosciWychodzace.stream(), platnosciPrzychodzace.stream())
                .sorted(Comparator.comparing(Platnosc::getId)).collect(Collectors.toList());
    }

    public List<Meldunek> findMeldunkiById(Long id) {
       List<Mieszkanie> mieszkania = findById(id).getMieszkania();
       return mieszkania.stream()
       .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream).toList();
    }

    public Long count() {
        return budynekRepository.count();
    }

}
