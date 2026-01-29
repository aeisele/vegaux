package com.andreaseisele.vegaux.vegauxserver.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class MapperConfig {

    private final Set<PropertyMap<?,?>> propertyMaps;

    public MapperConfig(Set<PropertyMap<?, ?>> propertyMaps) {
        this.propertyMaps = propertyMaps;
    }

    @Bean
    public ModelMapper modelMapper() {
        final ModelMapper modelMapper = new ModelMapper();

        propertyMaps.forEach(modelMapper::addMappings);

        return modelMapper;
    }

}
