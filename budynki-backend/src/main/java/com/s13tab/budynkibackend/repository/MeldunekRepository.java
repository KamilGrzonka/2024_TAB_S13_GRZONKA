package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Meldunek;

@RepositoryRestResource(collectionResourceRel = "meldunki", path = "meldunki")
public interface MeldunekRepository extends CrudRepository<Meldunek, Integer> {
    
}
