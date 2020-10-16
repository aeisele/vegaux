package com.andreaseisele.vegaux.vegauxserver.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

@Data
@Embeddable
public class Address {

    @NotNull
    private String addressLine1;

    private String addressLine2;

    @NotNull
    private String zipCode;

    @NotNull
    private String city;

    private String state;

    @NotNull
    private String country;

}
