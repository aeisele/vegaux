package com.andreaseisele.vegaux.vegauxserver.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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
