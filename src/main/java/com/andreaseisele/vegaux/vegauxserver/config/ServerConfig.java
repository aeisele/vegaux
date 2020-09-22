package com.andreaseisele.vegaux.vegauxserver.config;

import org.locationtech.jts.geom.GeometryFactory;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class ServerConfig {

    @Autowired
    private Set<PropertyMap<?,?>> propertyMaps;

    @Bean
    public GeometryFactory geometryFactory() {
        return new GeometryFactory();
    }

    @Bean
    public ModelMapper modelMapper() {
        final ModelMapper modelMapper = new ModelMapper();

        propertyMaps.forEach(modelMapper::addMappings);

        return modelMapper;
    }

}
