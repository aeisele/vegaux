package com.andreaseisele.vegaux.vegauxserver.dto.mapping;

import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.geo.GeoUtil;
import org.locationtech.jts.geom.Point;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;
import org.springframework.stereotype.Component;

public class PointConverters {

    @Component
    public static class PointToCoordinate implements Converter<Point, GeoCoordinate> {

        private final GeoUtil geoUtil;

        public PointToCoordinate(GeoUtil geoUtil) {
            this.geoUtil = geoUtil;
        }

        @Override
        public GeoCoordinate convert(MappingContext<Point, GeoCoordinate> context) {
            final Point source = context.getSource();
            return source != null ? geoUtil.toCoordinate(source) : null;
        }

    }

    @Component
    public static class CoordinateToPoint implements Converter<GeoCoordinate, Point> {

        private final GeoUtil geoUtil;

        public CoordinateToPoint(GeoUtil geoUtil) {
            this.geoUtil = geoUtil;
        }

        @Override
        public Point convert(MappingContext<GeoCoordinate, Point> context) {
            final GeoCoordinate source = context.getSource();
            return source != null ? geoUtil.toPoint(source) : null;
        }

    }

}
