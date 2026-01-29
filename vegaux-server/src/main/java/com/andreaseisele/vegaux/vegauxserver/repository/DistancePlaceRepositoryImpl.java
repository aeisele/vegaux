package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.hibernate.query.TupleTransformer;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DistancePlaceRepositoryImpl implements DistancePlaceRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DistanceResult> findInDistance(Point center, double radiusMeters) {
        String jpql = "select p, distance(:center, p.location) from Place p where dwithin(:center, p.location, :radiusMeters) = true";

        return entityManager.createQuery(jpql)
                .setParameter("center", center)
                .setParameter("radiusMeters", radiusMeters)
                .unwrap(org.hibernate.query.Query.class)
                .setTupleTransformer((TupleTransformer<DistanceResult>) (tuple, aliases) ->
                        new DistanceResult(
                                (Place) tuple[0],
                                ((Number) tuple[1]).doubleValue()
                        )
                ).getResultList();
    }
}
