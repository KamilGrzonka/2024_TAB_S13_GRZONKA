package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Zgloszenie;

/**
 * Repozytorium dostępu do danych dla encji Zgłoszenie.
 */
@Repository
public interface ZgloszenieRepository extends ListCrudRepository<Zgloszenie, Long> {

}
