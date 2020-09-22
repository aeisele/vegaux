package com.andreaseisele.vegaux.vegauxserver.dto;

import lombok.Data;

@Data
public class PlaceDto {

    Long id;
    String name;
    GeoCoordinate location;

}
