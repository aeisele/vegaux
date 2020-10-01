package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import com.vladmihalcea.hibernate.type.util.ListResultTransformer;
import org.hibernate.query.Query;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class DistancePlaceRepositoryImpl implements DistancePlaceRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings({"unchecked", "deprecation"})
    @Override
    public List<DistanceResult> findInDistance(Point center, double radiusMeters) {
        String jpql = "select p, distance(:center, p.location) from Place p where dwithin(:center, p.location, :radiusMeters) = true";

        return (List<DistanceResult>) entityManager.createQuery(jpql)
                .setParameter("center", center)
                .setParameter("radiusMeters", radiusMeters)
                .unwrap(Query.class)
                .setResultTransformer(
                        (ListResultTransformer)
                                (tuple, aliases) -> new DistanceResult(
                                        (Place) tuple[0],
                                        ((Number) tuple[1]).doubleValue()
                                )
                ).getResultList();
    }
}
