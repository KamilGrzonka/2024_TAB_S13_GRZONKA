package com.s13tab.budynkibackend.controller;

import com.s13tab.budynkibackend.model.Mieszkanie;
import com.s13tab.budynkibackend.model.dto.BudynekDto;
import com.s13tab.budynkibackend.model.dto.MieszkanieDto;

import org.springframework.web.bind.annotation.RestController;

import com.s13tab.budynkibackend.exception.BudynkiEntityNotFoundException;
import com.s13tab.budynkibackend.model.Budynek;
import com.s13tab.budynkibackend.repository.BudynekRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
public class BudynekController {
    private final BudynekRepository repository;

    public BudynekController(BudynekRepository repository) {
        this.repository = repository;
    }

    // @GetMapping("api/budynki")
    // public Iterable<Budynek> findAll() {
    //     return repository.findAll();
    // }

   @GetMapping("api/budynki")
   public List<BudynekDto> findAll() {
       return StreamSupport
               .stream(repository.findAll().spliterator(), false).toList()
               .stream().map(budynek -> convertToDto(budynek)).collect(Collectors.toList());
   }

    @GetMapping("api/budynki/mieszkania/{id}")
    public List<MieszkanieDto> findAllFlatsInTheBuilding(@PathVariable BigDecimal id){

        return repository.findById(id.intValue()).orElseThrow().getMieszkania().stream()
        .map(mieszkanie -> convertToDto(mieszkanie)).toList();
    }

    @PostMapping("api/budynki")
    public Budynek add(@RequestBody BudynekDto budynek) {
        return repository.save(convertToEntity(budynek));
    }

    @GetMapping("api/budynki/{id}")
    public BudynekDto findById(@PathVariable Integer id) {
        return convertToDto(repository.findById(id).orElseThrow(() -> new BudynkiEntityNotFoundException(id, "budynek")));
    }

    private Budynek convertToEntity(BudynekDto budynekDto)
    {
        return new Budynek(budynekDto.numerBudynku(), budynekDto.adres(), 
        budynekDto.liczbaMiejsc(),
         null);
    }

    private BudynekDto convertToDto(Budynek budynek)
    {
        return new BudynekDto(budynek.getNumberBudynku(),
        budynek.getAdres(), budynek.getLiczbaMiejsc());
    }

    ////////////////////////////////////////////////////////////

    // to chyba jest niezbyt dobre rozwiązanie ale idk
    private MieszkanieDto convertToDto(Mieszkanie mieszkanie)
    {
        return new MieszkanieDto(mieszkanie.getNumerMieszkania(), mieszkanie.getPietro(),
        mieszkanie.getLiczbaOsob(), mieszkanie.getOpis(), mieszkanie.getBudynek().getNumberBudynku());
    }

}
