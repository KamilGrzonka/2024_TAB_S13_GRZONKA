package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Platnosc;

/**
 * Repozytorium dostępu do danych dla encji Płatność.
 */
@Repository
public interface PlatnoscRepository extends ListCrudRepository<Platnosc, Long> {

}
