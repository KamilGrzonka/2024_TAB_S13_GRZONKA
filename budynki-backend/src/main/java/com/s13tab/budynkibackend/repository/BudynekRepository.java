package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Budynek;

/**
 * Repozytorium dostępu do danych dla encji Budynek.
 */
@Repository
public interface BudynekRepository extends ListCrudRepository<Budynek, Long> {

}
