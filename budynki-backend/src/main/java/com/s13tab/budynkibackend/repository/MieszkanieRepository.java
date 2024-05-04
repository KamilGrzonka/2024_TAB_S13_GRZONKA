package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Mieszkanie;

@RepositoryRestResource(collectionResourceRel = "mieszkania", path = "mieszkania")
public interface MieszkanieRepository extends CrudRepository<Mieszkanie, Integer> {

}
