package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import org.locationtech.jts.geom.Point;

import java.util.List;

public interface DistancePlaceRepository {

    List<DistanceResult> findInDistance(Point center, double radiusMeters);

}
