package com.s13tab.budynkibackend.repository;

import java.math.BigDecimal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Osoba;

@RepositoryRestResource(collectionResourceRel = "osoby", path = "osoby")
public interface OsobaRepository extends CrudRepository<Osoba, BigDecimal> {

}