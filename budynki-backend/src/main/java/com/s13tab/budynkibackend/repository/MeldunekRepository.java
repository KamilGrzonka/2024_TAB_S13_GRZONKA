package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Meldunek;

/**
 * Repozytorium dostępu do danych dla encji Meldunek.
 */
@Repository
public interface MeldunekRepository extends ListCrudRepository<Meldunek, Long> {
    
}
