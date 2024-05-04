package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Cennik;

@RepositoryRestResource(collectionResourceRel = "cenniki", path = "cenniki")
public interface CennikRepository extends CrudRepository<Cennik, Integer> {

}
