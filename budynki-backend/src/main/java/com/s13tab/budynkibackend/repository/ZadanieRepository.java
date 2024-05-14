package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Zadanie;

@Repository
public interface ZadanieRepository extends ListCrudRepository<Zadanie, Long> {

}
