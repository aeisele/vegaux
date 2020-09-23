package com.andreaseisele.vegaux.vegauxserver.dto.mapping;

import com.andreaseisele.vegaux.vegauxserver.dto.DistanceResultDto;
import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class DtoMapper {

    private final ModelMapper modelMapper;

    public DtoMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PlaceDto toDto(Place place) {
        return modelMapper.map(place, PlaceDto.class);
    }

    public DistanceResultDto toDto(DistanceResult distanceResult) {
        return modelMapper.map(distanceResult, DistanceResultDto.class);
    }

    public Place toEntity(PlaceDto dto) {
        return modelMapper.map(dto, Place.class);
    }

}
