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
        final Double latitude = Objects.requireNonNull(coordinate.getLatitude(), "latitude must not be null");
        final Double longitude = Objects.requireNonNull(coordinate.getLongitude(), "longitude must not be null");
        return geometryFactory.createPoint(new Coordinate(longitude, latitude));
    }

    public GeoCoordinate toCoordinate(Point point) {
        Objects.requireNonNull(point, "point must not be null");
        final Double x = Objects.requireNonNull(point.getX(), "x must not be null");
        final Double y = Objects.requireNonNull(point.getY(), "y must not be null");
        return new GeoCoordinate(y, x);
    }

}
