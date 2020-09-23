package com.andreaseisele.vegaux.vegauxserver.geo;

import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class GeoUtil {

    private final GeometryFactory geometryFactory;

    public GeoUtil(GeometryFactory geometryFactory) {
        this.geometryFactory = geometryFactory;
    }

    public Point toPoint(GeoCoordinate coordinate) {
        Objects.requireNonNull(coordinate, "coordinate must not be null");
        return toPoint(coordinate.getLatitude(), coordinate.getLongitude());
    }

    public Point toPoint(Double latitude, Double longitude) {
        Objects.requireNonNull(latitude, "latitude must not be null");
        Objects.requireNonNull(longitude, "longitude must not be null");
        return geometryFactory.createPoint(new Coordinate(longitude, latitude));
    }

    public GeoCoordinate toCoordinate(Point point) {
        Objects.requireNonNull(point, "point must not be null");
        return new GeoCoordinate(point.getY(), point.getX());
    }

}
