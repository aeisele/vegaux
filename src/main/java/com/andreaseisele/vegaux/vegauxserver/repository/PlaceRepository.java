package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.dto.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends CrudRepository<Place, Long> {

    @Query("select new com.andreaseisele.vegaux.vegauxserver.dto.DistanceResult(p, distance(:center, p.location)) from Place p where distance(:center, p.location) <= :radiusMeters")
    List<DistanceResult> findInDistance(Point center, double radiusMeters);

}
