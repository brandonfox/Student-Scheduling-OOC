package com.pineapple.pp.repositories;

import com.pineapple.pp.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface CardRepository extends JpaRepository<Card, Long> {

    Card findCardById(Long id);

    boolean existsById(Long id);
}
