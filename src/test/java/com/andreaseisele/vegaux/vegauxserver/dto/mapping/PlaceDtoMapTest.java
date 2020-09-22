package com.andreaseisele.vegaux.vegauxserver.dto.mapping;

import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.geo.GeoUtil;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import static org.assertj.core.api.Assertions.assertThat;


class PlaceDtoMapTest {

    private ModelMapper modelMapper;

    @BeforeEach
    void setUp() {
        final GeoUtil geoUtil = new GeoUtil(new GeometryFactory());

        this.modelMapper = new ModelMapper();
        this.modelMapper.addMappings(new PlaceDtoMap(new PointConverters.CoordinateToPoint(geoUtil)));
        this.modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
    }

    @Test
    void testMapAndValidate() {
        final GeoCoordinate coordinate = new GeoCoordinate(1.0, 2.0);
        final PlaceDto dto = new PlaceDto();
        dto.setId(1234L);
        dto.setName("test");
        dto.setLocation(coordinate);

        final Place entity = modelMapper.map(dto, Place.class);

        modelMapper.validate();
        assertThat(entity.getId()).isEqualTo(dto.getId());
        assertThat(entity.getName()).isEqualTo(dto.getName());
        //noinspection unchecked
        assertThat(entity.getLocation()).isNotNull();
        assertThat(entity.getLocation().getX()).isEqualTo(coordinate.getLongitude());
        assertThat(entity.getLocation().getY()).isEqualTo(coordinate.getLatitude());
    }
}