package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Meldunek;
import com.s13tab.budynkibackend.model.dto.MeldunekDto;
import com.s13tab.budynkibackend.repository.MeldunekRepository;
import com.s13tab.budynkibackend.repository.MieszkanieRepository;
import com.s13tab.budynkibackend.repository.OsobaRepository;

import java.util.stream.StreamSupport;

import org.springframework.web.bind.annotation.*;


@RestController
public class MeldunekController {

    private final MeldunekRepository repository;
    private final OsobaRepository osobaRepository;

    private final MieszkanieRepository mieszkanieRepository;


    public MeldunekController(MeldunekRepository repository,
                              MieszkanieRepository mieszkanieRepository,
                              OsobaRepository osobaRepository){
        this.repository = repository;
        this.mieszkanieRepository = mieszkanieRepository;
        this.osobaRepository = osobaRepository;}

    @GetMapping("api/meldunki")
    public Iterable<MeldunekDto> findAll(){return StreamSupport
        .stream(repository.findAll().spliterator(), false).toList()
    .stream().map(meldunek -> convertToDto(meldunek)).toList();}

    @GetMapping("api/meldunki/{id}")
    public MeldunekDto findById(@PathVariable Integer id) {
        return convertToDto(repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "meldunek")));
    }

    @PostMapping("api/meldunki")
    public MeldunekDto add(@RequestBody MeldunekDto meldunek) {
        return convertToDto(repository.save(convertToEntity(meldunek)));
    }

    @PutMapping("api/meldunki/{numerMeldunku}")
    public MeldunekDto replace(@RequestBody MeldunekDto newMeldunek, @PathVariable Integer numerMeldunku) {
         return convertToDto(repository.findById(numerMeldunku).map(meldunek -> {
                    meldunek.setDataMeldunku(newMeldunek.dataMeldunku());
                    meldunek.setDataWymeldowania(newMeldunek.dataWymeldowania());
                    meldunek.setStatusMeldunku(newMeldunek.statusMeldunku());
                    meldunek.setOsoba(osobaRepository.findById(newMeldunek.osobaPesel()).orElseThrow());
                    meldunek.setMieszkanie(mieszkanieRepository.findById(newMeldunek.numerMieszkania()).orElseThrow());
                    return repository.save(meldunek);
                })
                .orElseGet(() -> {
                    return (repository.save(convertToEntity(newMeldunek)));
                }));
    }

    private Meldunek convertToEntity(MeldunekDto meldunekDto)
    {
        return new Meldunek(meldunekDto.numerMeldunku(),
        meldunekDto.dataMeldunku(), meldunekDto.dataWymeldowania(), meldunekDto.statusMeldunku(),
        osobaRepository.findById(meldunekDto.osobaPesel()).orElseThrow(),
        mieszkanieRepository.findById(meldunekDto.numerMieszkania()).orElseThrow());
    }

    private MeldunekDto convertToDto(Meldunek meldunek)
    {
        return new MeldunekDto(meldunek.getNumerMeldunku(), meldunek.getDataMeldunku(), 
        meldunek.getDataWymeldowania(),
         meldunek.getStatusMeldunku(),
          meldunek.getOsoba().getPesel(),
           meldunek.getMieszkanie().getNumerMieszkania());
    }

}
