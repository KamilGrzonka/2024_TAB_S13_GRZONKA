package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Budynek;

@RepositoryRestResource(collectionResourceRel = "budynki", path = "budynki")
public interface BudynekRepository extends CrudRepository<Budynek, Integer> {

}
