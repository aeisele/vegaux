package com.andreaseisele.vegaux.vegauxserver.repository;

import com.andreaseisele.vegaux.vegauxserver.dto.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
@DataJpaTest(properties = {
        "spring.liquibase.enabled=true"
})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class PlaceRepositoryIntegrationTest {

    @SuppressWarnings("rawtypes")
    @Container
    static PostgreSQLContainer postGisContainer = new PostgreSQLContainer(new DockerImageName("postgis/postgis", "12-3.0-alpine").toString());

    @Autowired
    private PlaceRepository repository;

    private GeometryFactory geometryFactory = new GeometryFactory();

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postGisContainer::getJdbcUrl);
        registry.add("spring.datasource.username", postGisContainer::getUsername);
        registry.add("spring.datasource.password", postGisContainer::getPassword);
    }

    @Test
    void testInsertNewPlace() {
        final Place place = place("test place", 48.366512, 10.894446);

        final Place saved = repository.save(place);

        assertThat(saved).isNotNull();
        assertThat(saved.getId()).isNotNull();
        assertThat(saved).isEqualTo(place);
    }

    @Test
    void testFindInDistance() {
        final Place downtown = place("downtown aux", 48.370544, 10.897790);
        final Place prinzreg = place("prinzreg", 48.367677, 10.889468);
        final Place muc = place("Muc", 48.135124, 11.581981);
        repository.saveAll(Arrays.asList(downtown, prinzreg, muc));

        final List<DistanceResult> inDistance = repository.findInDistance(downtown.getLocation(), 2000);
        assertThat(inDistance).hasSize(2);
        inDistance.forEach(r -> assertThat(r.getDistanceMeters()).as("distance in meters").isNotNull());
        assertThat(inDistance).extracting(DistanceResult::getPlace).containsOnly(downtown, prinzreg);
    }

    private Place place(String name, double latitude, double longitude) {
        final Point point = geometryFactory.createPoint(new Coordinate(latitude, longitude));
        return new Place(name, point);
    }

}