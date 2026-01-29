package com.andreaseisele.vegaux.vegauxserver.model;

import lombok.Data;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Data
@Embeddable
public class Address {

    @NotEmpty
    @NotNull
    private String addressLine1;

    private String addressLine2;

    @NotEmpty
    @NotNull
    private String zipCode;

    @NotEmpty
    @NotNull
    private String city;

    private String state;

    @NotEmpty
    @NotNull
    private String country;

}
