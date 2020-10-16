package com.andreaseisele.vegaux.vegauxserver.data;

import com.andreaseisele.vegaux.vegauxserver.model.Address;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
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
        final var fakerAddress = faker.address();
        final Address address = randomAddress(fakerAddress);
        try {
            return place(fakerAddress.fullAddress(),
                    systemFormat.parse(fakerAddress.latitude()).doubleValue(),
                    systemFormat.parse(fakerAddress.longitude()).doubleValue(),
                    address);
        } catch (ParseException e) {
            throw new RuntimeException("unable to parse faker data", e);
        }
    }

    public static Place place(String name, double latitude, double longitude) {
        return place(name, latitude, longitude, randomAddress());
    }

    public static Place place(String name, double latitude, double longitude, Address address) {
        final Point point = GEO_FACTORY.createPoint(new Coordinate(longitude, latitude));
        return new Place(name, point, address);
    }

    public static Address randomAddress() {
        return randomAddress(faker.address());
    }

    public static Address randomAddress(com.github.javafaker.Address fakerAddress) {
        Address address = new Address();
        address.setAddressLine1(fakerAddress.streetAddress() + " " + fakerAddress.streetAddressNumber());
        address.setZipCode(fakerAddress.zipCode());
        address.setCity(fakerAddress.city());
        address.setCountry(fakerAddress.country());
        return address;
    }

    public static Double randomDouble() {
        return faker.number().randomDouble(3, 10, 1000);
    }

}
