package com.andreaseisele.vegaux.vegauxserver.dto.mapping;

import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

@Component
public class PlaceDtoMap extends PropertyMap<PlaceDto, Place> {

    private final PointConverters.CoordinateToPoint converter;

    public PlaceDtoMap(PointConverters.CoordinateToPoint converter) {
        this.converter = converter;
    }

    @Override
    protected void configure() {
        using(converter).map(source.getLocation()).setLocation(null);
    }

}
