package com.s13tab.budynkibackend.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.s13tab.budynkibackend.dto.BudynekZyskDTO;
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

    public List<Platnosc> findPlatnosciWychodzaceById(Long id) {
        return findZadaniaById(id).stream().map(zadanie -> zadanie.getPlatnosci())
        .flatMap(List::stream).toList();
    }

    public List<Platnosc> findPlatnosciPrzychodzaceById(Long id) {
        return findMieszkaniaById(id).stream()
                .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream)
                .map(meldunek -> meldunek.getPlatnosci()).flatMap(List::stream).toList();
    }
    
    public List<Platnosc> findPlatnosciById(Long id) {
        return Stream.concat(findPlatnosciWychodzaceById(id).stream(), findPlatnosciPrzychodzaceById(id).stream())
                .sorted(Comparator.comparing(Platnosc::getId)).collect(Collectors.toList());
    }

    public List<Meldunek> findMeldunkiById(Long id) {
       List<Mieszkanie> mieszkania = findById(id).getMieszkania();
       return mieszkania.stream()
       .map(mieszkanie -> mieszkanie.getMeldunki()).flatMap(List::stream).toList();
    }

    public List<BudynekZyskDTO> findAllBudynekZyskDTO(Date dataPoczatkowa, Date dataKoncowa) {
        List<Budynek> budynki = findAll();
        return budynki.stream().map(budynek -> {
            BigDecimal zysk = findPlatnosciById(budynek.getId()).stream().filter(platnosc -> {
                Date dataZrealizowania = platnosc.getDataZrealizowania();
                return dataZrealizowania.compareTo(dataPoczatkowa) >= 0
                        && dataKoncowa.compareTo(dataZrealizowania) >= 0;
            }).map(platnosc -> {
                BigDecimal wartosc = platnosc.getWartosc();
                return platnosc.getMeldunek() != null ? wartosc : wartosc.negate();
            })
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            return new BudynekZyskDTO(budynek.getId(), budynek.getUlica(), budynek.getNumerBudynku(),
                    budynek.getKodPocztowy(), budynek.getMiasto(), zysk);
        }).collect(Collectors.toList());
    }

    public Long count() {
        return budynekRepository.count();
    }

}
