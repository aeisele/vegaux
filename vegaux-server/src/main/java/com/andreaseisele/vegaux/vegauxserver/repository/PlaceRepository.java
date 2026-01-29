package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long>, DistancePlaceRepository {

}
