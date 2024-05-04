package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Zgloszenie;

@RepositoryRestResource(collectionResourceRel = "zgloszenia", path = "zgloszenia")
public interface ZgloszenieRepository extends CrudRepository<Zgloszenie, Integer> {

}
