package com.andreaseisele.vegaux.vegauxserver.repository;

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

    @Test
    void testInsertNewPlace() {
        final Point point = new GeometryFactory().createPoint(new Coordinate(48.366512, 10.894446));
        final Place place = new Place("test place", point);

        final Place saved = repository.save(place);

        assertThat(saved).isNotNull();
        assertThat(saved.getId()).isNotNull();
        assertThat(saved).isEqualTo(place);
    }

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postGisContainer::getJdbcUrl);
        registry.add("spring.datasource.username", postGisContainer::getUsername);
        registry.add("spring.datasource.password", postGisContainer::getPassword);
    }

}