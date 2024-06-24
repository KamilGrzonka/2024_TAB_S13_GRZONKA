package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Firma;

/**
 * Repozytorium dostępu do danych dla encji Firma.
 */
@Repository
public interface FirmaRepository extends ListCrudRepository<Firma, Long> {

}
