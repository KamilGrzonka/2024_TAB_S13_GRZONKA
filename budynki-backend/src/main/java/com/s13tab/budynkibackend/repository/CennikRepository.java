package com.s13tab.budynkibackend.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import com.s13tab.budynkibackend.model.Cennik;

@Repository
public interface CennikRepository extends ListCrudRepository<Cennik, Long> {

}
