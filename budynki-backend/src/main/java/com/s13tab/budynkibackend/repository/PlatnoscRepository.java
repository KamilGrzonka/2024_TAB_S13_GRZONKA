package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Platnosc;

@RepositoryRestResource(collectionResourceRel = "platnosci", path = "platnosci")
public interface PlatnoscRepository extends CrudRepository<Platnosc, Integer> {

}
