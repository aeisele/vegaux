package com.andreaseisele.vegaux.vegauxserver.rest;

import com.andreaseisele.vegaux.vegauxserver.dto.DistanceResultDto;
import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import com.andreaseisele.vegaux.vegauxserver.service.PlaceService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/places")
public class PlaceController {

    private final PlaceService service;
    private final ModelMapper modelMapper;

    public PlaceController(PlaceService service, ModelMapper modelMapper) {
        this.service = service;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public Page<PlaceDto> findAll(Pageable pageable) {
        return service.findAll(pageable)
                .map(this::toDto);
    }

    @GetMapping("/inDistance")
    public List<DistanceResultDto> findInDistance(@Valid GeoCoordinate origin, @RequestParam Double radiusMeters) {
        return service.findInDistance(origin, radiusMeters)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public PlaceDto create(@RequestParam String name, @Valid GeoCoordinate location) {
        return toDto(service.create(name, location));
    }

    @PutMapping("/{id}")
    public PlaceDto update(@PathVariable Long id, @RequestBody PlaceDto placeDto) {
        placeDto.setId(id);
        return toDto(service.update(toEntity(placeDto)));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    private PlaceDto toDto(Place place) {
        return modelMapper.map(place, PlaceDto.class);
    }

    private DistanceResultDto toDto(DistanceResult distanceResult) {
        return modelMapper.map(distanceResult, DistanceResultDto.class);
    }

    private Place toEntity(PlaceDto dto) {
        return modelMapper.map(dto, Place.class);
    }

}
