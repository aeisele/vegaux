package com.andreaseisele.vegaux.vegauxserver.dto;

import lombok.Data;

@Data
public class DistanceResultDto {

    private PlaceDto place;

    private Double distanceMeters;

}
