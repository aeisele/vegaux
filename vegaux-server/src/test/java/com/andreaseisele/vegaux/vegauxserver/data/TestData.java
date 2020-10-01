package com.andreaseisele.vegaux.vegauxserver.data;

import com.andreaseisele.vegaux.vegauxserver.model.Place;
import com.github.javafaker.Address;
import com.github.javafaker.Faker;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Locale;

public class TestData {

    private static final GeometryFactory GEO_FACTORY = new GeometryFactory();
    private static final Faker faker = new Faker(Locale.US);
    private static final NumberFormat systemFormat = NumberFormat.getNumberInstance();

    public static Place place() {
        final Address address = faker.address();
        try {
            return place(address.fullAddress(),
                    systemFormat.parse(address.latitude()).doubleValue(),
                    systemFormat.parse(address.longitude()).doubleValue());
        } catch (ParseException e) {
            throw new RuntimeException("unable to parse faker data", e);
        }
    }

    public static Place place(String name, double latitude, double longitude) {
        final Point point = GEO_FACTORY.createPoint(new Coordinate(longitude, latitude));
        return new Place(name, point);
    }

    public static Double randomDouble() {
        return faker.number().randomDouble(3, 10, 1000);
    }

}
