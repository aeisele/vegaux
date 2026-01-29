package com.andreaseisele.vegaux.vegauxserver.dto;

import com.andreaseisele.vegaux.vegauxserver.model.Address;
import lombok.Data;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

@Data
public class PlaceDto {

    Long id;

    @NotNull
    String name;

    @Valid
    GeoCoordinate location;

    @Valid
    Address address;

}
