package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.dto.MeldunekDto;
import com.s13tab.budynkibackend.model.dto.MieszkanieDto;
import com.s13tab.budynkibackend.repository.BudynekRepository;
import com.s13tab.budynkibackend.repository.MieszkanieRepository;

import java.util.List;
import java.util.stream.StreamSupport;

import org.springframework.web.bind.annotation.*;

import com.s13tab.budynkibackend.model.Meldunek;

@RestController
public class MieszkanieController {

    private final MieszkanieRepository repository;
    private final BudynekRepository budynekRepository;

    public MieszkanieController(MieszkanieRepository repository, 
    BudynekRepository budynekRepository) {
        this.repository = repository;
        this.budynekRepository = budynekRepository;
    }

    @GetMapping("api/mieszkania")
    public Iterable<MieszkanieDto>findAll(){return StreamSupport
        .stream(repository.findAll().spliterator(), false).toList()
                   .stream().map(m -> convertToDto(m)).toList();}

    @GetMapping("api/mieszkania/{id}")
    public MieszkanieDto findById(@PathVariable Integer id)
    {
        return convertToDto(repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "mieszkanie")));
    }

    @PostMapping("api/mieszkania")
    public MieszkanieDto add(@RequestBody MieszkanieDto mieszkanie){
        return convertToDto(repository.save(convertToEntity(mieszkanie)));
    }

    @GetMapping("api/mieszkania/meldunki/{id}")
    public List<MeldunekDto> findMeldunkiById(@PathVariable Integer id) {
        return repository.findById(id).orElseThrow().getMeldunki()
        .stream()
        .map(meldunek -> convertToDto(meldunek)).toList();
    }

    @PutMapping("api/mieszkania/{numerMieszkania}")
    public MieszkanieDto replace(@RequestBody MieszkanieDto newMieszkanie, @PathVariable Integer numerMieszkania){
        return convertToDto(repository.findById(numerMieszkania).map(mieszkanie -> {
            mieszkanie.setLiczbaOsob(newMieszkanie.liczbaOsob());
            mieszkanie.setPietro(newMieszkanie.pietro());
            mieszkanie.setOpis(newMieszkanie.opis());
            mieszkanie.setBudynek(budynekRepository.findById(newMieszkanie.numerBudynku())
            .orElseThrow());
            
            return repository.save(mieszkanie);
        })
                .orElseGet(() -> {
                    return (repository.save(convertToEntity(newMieszkanie)));
                }));
    }

    private Mieszkanie convertToEntity(MieszkanieDto mieszkanie)
    {
       return new Mieszkanie(mieszkanie.numerMieszkania(),
                mieszkanie.pietro(), mieszkanie.liczbaOsob(), 
                mieszkanie.opis(),
                budynekRepository.findById(mieszkanie.numerBudynku()).orElseThrow(), null);
    }

    private MieszkanieDto convertToDto(Mieszkanie mieszkanie)
    {
        return new MieszkanieDto(mieszkanie.getNumerMieszkania(), mieszkanie.getPietro(),
        mieszkanie.getLiczbaOsob(), mieszkanie.getOpis(), mieszkanie.getBudynek().getNumberBudynku());
    }

    /////////////////////////////////////////////////////

    private MeldunekDto convertToDto(Meldunek meldunek)
    {
        return new MeldunekDto(meldunek.getNumerMeldunku(), meldunek.getDataMeldunku(), 
        meldunek.getDataWymeldowania(),
         meldunek.getStatusMeldunku(),
          meldunek.getOsoba().getPesel(),
           meldunek.getMieszkanie().getNumerMieszkania());
    }

}
