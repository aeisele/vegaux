package com.andreaseisele.vegaux.vegauxserver.service;

import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.geo.GeoUtil;
import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import com.andreaseisele.vegaux.vegauxserver.repository.PlaceRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
public class PlaceService {

    private final PlaceRepository repository;
    private final GeoUtil geoUtil;

    public PlaceService(PlaceRepository repository, GeoUtil geoUtil) {
        this.repository = repository;
        this.geoUtil = geoUtil;
    }

    @Transactional
    public Place create(String name, GeoCoordinate location) {
        final Place place = new Place(name, geoUtil.toPoint(location));
        log.debug("saving new place {}", place);
        return repository.save(place);
    }

    public Page<Place> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<DistanceResult> findInDistance(GeoCoordinate origin, double radiusMeters) {
        return repository.findInDistance(geoUtil.toPoint(origin), radiusMeters);
    }

    @Transactional
    public Place update(Place place) {
        log.debug("updating place {}", place);
        return repository.save(place);
    }

    @Transactional
    public void delete(long placeId) {
        repository.deleteById(placeId);
    }

}
