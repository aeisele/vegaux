package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends CrudRepository<Place, Long> {
}
