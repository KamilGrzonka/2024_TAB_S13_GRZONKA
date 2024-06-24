package com.s13tab.budynkibackend.controller;

import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.dto.BudynekDTO;
import com.s13tab.budynkibackend.dto.BudynekZyskDTO;
import com.s13tab.budynkibackend.dto.MeldunekDTO;
import com.s13tab.budynkibackend.dto.MeldunkiWyswietlDTO;
import com.s13tab.budynkibackend.dto.MieszkanieDTO;
import com.s13tab.budynkibackend.dto.PlatnoscDTO;
import com.s13tab.budynkibackend.dto.ZadanieDTO;
import com.s13tab.budynkibackend.dto.ZaleglaPlatnoscDTO;
import com.s13tab.budynkibackend.dto.ZgloszeniaWyswietlDTO;
import com.s13tab.budynkibackend.dto.ZgloszenieDTO;
import com.s13tab.budynkibackend.mapper.BudynekMapper;
import com.s13tab.budynkibackend.mapper.MeldunekMapper;
import com.s13tab.budynkibackend.mapper.MieszkanieMapper;
import com.s13tab.budynkibackend.mapper.PlatnoscMapper;
import com.s13tab.budynkibackend.mapper.ZadanieMapper;
import com.s13tab.budynkibackend.mapper.ZgloszenieMapper;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.Zgloszenie;
import com.s13tab.budynkibackend.service.BudynekService;
import com.s13tab.budynkibackend.service.ZgloszenieService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Kontroler obsługujący operacje na zasobach związanych z budynkami.
 */
@RequiredArgsConstructor
@RequestMapping("/api/budynki")
@RestController
public class BudynekController {

    private final BudynekService budynekService;

    private final ZgloszenieService zgloszenieService;

    private final BudynekMapper budynekMapper;
    private final MieszkanieMapper mieszkanieMapper;
    private final MeldunekMapper meldunekMapper;
    private final ZgloszenieMapper zgloszenieMapper;
    private final ZadanieMapper zadanieMapper;
    private final PlatnoscMapper platnoscMapper;

    /**
     * Pobiera wszystkie budynki.
     *
     * @return lista {@link BudynekDTO} reprezentująca wszystkie budynki
     */
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<BudynekDTO> findAll() {
        return budynekMapper.convertToDTO(budynekService.findAll());
    }

    /**
     * Dodaje nowy budynek.
     *
     * @param budynek obiekt {@link BudynekDTO} reprezentujący nowy budynek do dodania
     * @return dodany {@link BudynekDTO}
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BudynekDTO add(@RequestBody @Valid BudynekDTO budynek) {
        return budynekMapper.convertToDTO(budynekService.save(budynekMapper.convertToEntity(budynek)));
    }

    /**
     * Pobiera budynek o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return {@link BudynekDTO} reprezentujący budynek o podanym identyfikatorze
     */
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BudynekDTO findById(@PathVariable Long id) {
        return budynekMapper.convertToDTO(budynekService.findById(id));
    }

    /**
     * Pobiera mieszkania należące do budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link MieszkanieDTO} reprezentująca mieszkania w danym budynku
     */
    @GetMapping("/{id}/mieszkania")
    @ResponseStatus(HttpStatus.OK)
    public List<MieszkanieDTO> findMieszkaniaById(@PathVariable Long id) {

        return mieszkanieMapper.convertToDTO(budynekService.findMieszkaniaById(id));
    }

    /**
     * Pobiera meldunki dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link MeldunekDTO} reprezentująca meldunki dla danego budynku
     */
    @GetMapping("/{id}/meldunki")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunekDTO> findMeldunkiById(@PathVariable Long id) {
        return meldunekMapper.convertToDTO(budynekService.findMeldunkiById(id));
    }

    /**
     * Pobiera zgłoszenia dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link ZgloszenieDTO} reprezentująca zgłoszenia dla danego budynku
     */
    @GetMapping("/{id}/zgloszenia")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszenieDTO> findZgloszeniaById(@PathVariable Long id) {
        return zgloszenieMapper.convertToDTO(budynekService.findZgloszeniaById(id));
    }

    /**
     * Pobiera zadania dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link ZadanieDTO} reprezentująca zadania dla danego budynku
     */
    @GetMapping("/{id}/zadania")
    @ResponseStatus(HttpStatus.OK)
    public List<ZadanieDTO> findZadaniaById(@PathVariable Long id) {
        return zadanieMapper.convertToDTO(budynekService.findZadaniaById(id));
    }

    /**
     * Pobiera płatności dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link PlatnoscDTO} reprezentująca płatności dla danego budynku
     */
    @GetMapping("/{id}/platnosci")
    @ResponseStatus(HttpStatus.OK)
    public List<PlatnoscDTO> findPlatnosciById(@PathVariable Long id) {
        return platnoscMapper.convertToDTO(budynekService.findPlatnosciById(id));
    }

    /**
     * Pobiera meldunki do wyświetlenia dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link MeldunkiWyswietlDTO} reprezentująca meldunki do wyświetlenia dla danego budynku
     */
    @GetMapping("/{id}/meldunkiWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public List<MeldunkiWyswietlDTO> findMeldunkiToDisplayById(@PathVariable Long id) {
        List<Meldunek> meldunki = budynekService.findMeldunkiById(id);
        return meldunki.stream()
                .map(meldunek -> new MeldunkiWyswietlDTO(meldunek.getId(), meldunek.getOsoba().getId(),
                        meldunek.getMieszkanie().getId(),
                        meldunek.getMieszkanie().getNumerMieszkania(), meldunek.getOsoba().getImie(),
                        meldunek.getOsoba().getNazwisko(), meldunek.getDataMeldunku(), meldunek.getDataWymeldowania(), meldunek.isWynajmujacy()))
                .collect(Collectors.toList());
    }

    /**
     * Pobiera zgłoszenia do wyświetlenia dla budynku o podanym identyfikatorze.
     *
     * @param id identyfikator budynku
     * @return lista {@link ZgloszeniaWyswietlDTO} reprezentująca zgłoszenia do wyświetlenia dla danego budynku
     */
    @GetMapping("/{id}/zgloszeniaWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszeniaWyswietlDTO> findZgloszeniaToDisplayById(@PathVariable Long id) {
        List<Zgloszenie> zgloszenia = budynekService.findZgloszeniaById(id);
        return zgloszenia.stream()
                .map(zgloszenie -> zgloszenieService.findZgloszenieToDisplayById(zgloszenie.getId()))
                .collect(Collectors.toList());
    }

    /**
     * Pobiera zyski w określonym okresie czasu dla wszystkich budynków.
     *
     * @param dataPoczatkowa data początkowa okresu
     * @param dataKoncowa    data końcowa okresu
     * @return lista {@link BudynekZyskDTO} reprezentująca zyski budynków w określonym okresie czasu
     */
    @GetMapping("/zyski")
    @ResponseStatus(HttpStatus.OK)
    public List<BudynekZyskDTO> findAllZyski(@RequestParam Long dataPoczatkowa, @RequestParam Long dataKoncowa) {
        return budynekService.findAllBudynekZyskDTO(new Date(dataPoczatkowa), new Date(dataKoncowa));
    }

    /**
     * Pobiera aktywne zgłoszenia do wyświetlenia dla wszystkich budynków.
     *
     * @return lista {@link ZgloszeniaWyswietlDTO} reprezentująca aktywne zgłoszenia do wyświetlenia
     */
    @GetMapping("/aktywneZgloszeniaWyswietl")
    @ResponseStatus(HttpStatus.OK)
    public List<ZgloszeniaWyswietlDTO> findAllActiveZgloszenia() {
        List<Zgloszenie> zgloszenia = budynekService.findAllActiveZgloszenia();
        return zgloszenia.stream()
                .map(zgloszenie -> zgloszenieService.findZgloszenieToDisplayById(zgloszenie.getId()))
                .collect(Collectors.toList());
    }

    /**
     * Pobiera zaległe płatności dla wszystkich budynków.
     *
     * @return lista {@link ZaleglaPlatnoscDTO} reprezentująca zaległe płatności
     */
    @GetMapping("/zaleglePlatnosci")
    @ResponseStatus(HttpStatus.OK)
    public List<ZaleglaPlatnoscDTO> findAllOverduePlatnosci() {
        return budynekService.findAllOverduePlatnosci();
    }

}
