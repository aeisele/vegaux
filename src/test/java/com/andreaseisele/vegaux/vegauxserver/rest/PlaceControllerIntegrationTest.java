package com.andreaseisele.vegaux.vegauxserver.rest;

import com.andreaseisele.vegaux.vegauxserver.data.TestData;
import com.andreaseisele.vegaux.vegauxserver.dto.GeoCoordinate;
import com.andreaseisele.vegaux.vegauxserver.dto.PlaceDto;
import com.andreaseisele.vegaux.vegauxserver.dto.mapping.DtoMapper;
import com.andreaseisele.vegaux.vegauxserver.model.DistanceResult;
import com.andreaseisele.vegaux.vegauxserver.model.Place;
import com.andreaseisele.vegaux.vegauxserver.service.PlaceService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@EnableAutoConfiguration(exclude = DataSourceAutoConfiguration.class)
class PlaceControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DtoMapper dtoMapper;

    @MockBean
    private PlaceService service;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testFindAll() throws Exception {
        final Place randomPlace = TestData.place();
        final PageImpl<Place> page = new PageImpl<>(Collections.singletonList(randomPlace));
        when(service.findAll(any(Pageable.class))).thenReturn(page);

        final String payload = objectMapper.writeValueAsString(page.map(dtoMapper::toDto));

        mockMvc.perform(get(PlaceController.ROOT_URL)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(payload));
    }

    @Test
    void testFindInDistance_Ok() throws Exception {
        final Place randomPlace = TestData.place();
        final DistanceResult distanceResult = new DistanceResult(randomPlace, TestData.randomDouble());
        final List<DistanceResult> result = Collections.singletonList(distanceResult);
        when(service.findInDistance(any(GeoCoordinate.class), anyDouble())).thenReturn(result);

        final String payload = objectMapper.writeValueAsString(
                result.stream().map(dtoMapper::toDto).collect(Collectors.toList()));

        mockMvc.perform(get(PlaceController.ROOT_URL + PlaceController.DISTANCE_URL)
                .param("latitude", "1.0")
                .param("longitude", "2.0")
                .param("radiusMeters", "100")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(payload));
    }

    @Test
    void testFindInDistance_MissingParam() throws Exception {
        mockMvc.perform(get(PlaceController.ROOT_URL + PlaceController.DISTANCE_URL)
                .param("latitude", "1.0")
                .param("radiusMeters", "100")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreate_Created() throws Exception {
        final Place randomPlace = TestData.place();
        when(service.create(anyString(), any(GeoCoordinate.class))).thenReturn(randomPlace);

        final String payload = objectMapper.writeValueAsString(dtoMapper.toDto(randomPlace));

        mockMvc.perform(post(PlaceController.ROOT_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(payload));
    }

    @Test
    void testCreate_MissingValue() throws Exception {
        final Place randomPlace = TestData.place();
        when(service.create(anyString(), any(GeoCoordinate.class))).thenReturn(randomPlace);

        final PlaceDto dto = dtoMapper.toDto(randomPlace);
        dto.getLocation().setLatitude(null);
        final String payload = objectMapper.writeValueAsString(dto);

        mockMvc.perform(post(PlaceController.ROOT_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testUpdate() throws Exception {
        final Place randomPlace = TestData.place();
        when(service.update(any(Place.class))).thenReturn(randomPlace);

        final String payload = objectMapper.writeValueAsString(dtoMapper.toDto(randomPlace));

        mockMvc.perform(put(PlaceController.ROOT_URL + "/{id}", 123)
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(payload));
    }

    @Test
    void testDelete() throws Exception {
        mockMvc.perform(delete(PlaceController.ROOT_URL + "/{id}", 123))
                .andExpect(status().isOk());
    }

}