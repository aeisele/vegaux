package com.andreaseisele.vegaux.vegauxserver.dto;

import com.andreaseisele.vegaux.vegauxserver.model.Place;
import lombok.Value;

@Value
public class DistanceResult {

    Place place;

    Double distanceMeters;

}
