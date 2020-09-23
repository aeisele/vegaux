package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends PagingAndSortingRepository<Place, Long> {

    @Query("select new com.andreaseisele.vegaux.vegauxserver.model.DistanceResult(p, distance(:center, p.location)) from Place p where dwithin(:center, p.location, :radiusMeters) = true")
    List<DistanceResult> findInDistance(Point center, double radiusMeters);

}
