package com.andreaseisele.vegaux.vegauxserver.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class GeoCoordinate {

    @NotNull
    private Double latitude;

    @NotNull
    private Double longitude;

}
