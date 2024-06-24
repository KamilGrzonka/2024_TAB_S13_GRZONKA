package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Mieszkanie;

/**
 * Repozytorium dostępu do danych dla encji Mieszkanie.
 */
@Repository
public interface MieszkanieRepository extends ListCrudRepository<Mieszkanie, Long> {

}
