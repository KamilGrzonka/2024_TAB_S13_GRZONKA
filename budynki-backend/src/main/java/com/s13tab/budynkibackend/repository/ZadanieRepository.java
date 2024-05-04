package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Zadanie;

@RepositoryRestResource(collectionResourceRel = "zadania", path = "zadania")
public interface ZadanieRepository extends CrudRepository<Zadanie, Integer> {

}
