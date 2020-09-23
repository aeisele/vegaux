package com.andreaseisele.vegaux.vegauxserver.rest;

import com.andreaseisele.vegaux.vegauxserver.dto.DistanceResultDto;
import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.dto.mapping.DtoMapper;
import com.andreaseisele.vegaux.vegauxserver.service.PlaceService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

import static com.andreaseisele.vegaux.vegauxserver.rest.PlaceController.ROOT_URL;

@RestController
@RequestMapping(ROOT_URL)
public class PlaceController {

    public static final String ROOT_URL = "/places";
    public static final String DISTANCE_URL = "/inDistance";

    private final PlaceService service;
    private final DtoMapper dtoMapper;

    public PlaceController(PlaceService service, DtoMapper dtoMapper) {
        this.service = service;
        this.dtoMapper = dtoMapper;
    }

    @GetMapping
    public Page<PlaceDto> findAll(Pageable pageable) {
        return service.findAll(pageable)
                .map(dtoMapper::toDto);
    }

    @GetMapping(DISTANCE_URL)
    public List<DistanceResultDto> findInDistance(@Valid GeoCoordinate origin, @RequestParam Double radiusMeters) {
        return service.findInDistance(origin, radiusMeters)
                .stream()
                .map(dtoMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PlaceDto create(@RequestBody @Valid PlaceDto placeDto) {
        return dtoMapper.toDto(service.create(placeDto.getName(), placeDto.getLocation()));
    }

    @PutMapping("/{id}")
    public PlaceDto update(@PathVariable Long id, @RequestBody @Valid PlaceDto placeDto) {
        placeDto.setId(id);
        return dtoMapper.toDto(service.update(dtoMapper.toEntity(placeDto)));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

}
