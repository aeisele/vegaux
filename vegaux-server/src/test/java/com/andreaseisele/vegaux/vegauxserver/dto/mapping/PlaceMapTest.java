package com.andreaseisele.vegaux.vegauxserver.dto.mapping;

import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.geo.GeoUtil;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import static org.assertj.core.api.Assertions.assertThat;

class PlaceMapTest {

    private ModelMapper modelMapper;

    @BeforeEach
    void setUp() {
        final GeoUtil geoUtil = new GeoUtil(new GeometryFactory());

        this.modelMapper = new ModelMapper();
        this.modelMapper.addMappings(new PlaceMap(new PointConverters.PointToCoordinate(geoUtil)));
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Test
    void testMapAndValidate() {
        final Point point = new GeometryFactory().createPoint(new Coordinate(1, 2));
        final Place place = new Place("test", point);
        place.setId(1234L);

        final PlaceDto dto = modelMapper.map(place, PlaceDto.class);

        modelMapper.validate();
        assertThat(dto.getId()).isEqualTo(place.getId());
        assertThat(dto.getName()).isEqualTo(place.getName());
        assertThat(dto.getLocation()).isNotNull();
        assertThat(dto.getLocation().getLatitude()).isEqualTo(point.getY());
        assertThat(dto.getLocation().getLongitude()).isEqualTo(point.getX());
    }

}