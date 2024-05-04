package com.s13tab.budynkibackend.repository;

import java.math.BigDecimal;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.s13tab.budynkibackend.model.Firma;

@RepositoryRestResource(collectionResourceRel = "firmy", path = "firmy")
public interface FirmaRepository extends CrudRepository<Firma, BigDecimal> {

}
