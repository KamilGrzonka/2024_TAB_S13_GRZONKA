package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Umowa;

@RepositoryRestResource(collectionResourceRel = "umowy", path = "umowy")
public interface UmowaRepository extends CrudRepository<Umowa, Integer> {

}
