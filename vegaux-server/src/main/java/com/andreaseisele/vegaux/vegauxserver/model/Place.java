package com.andreaseisele.vegaux.vegauxserver.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.locationtech.jts.geom.Point;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "PLACES")
public class Place extends BaseEntity<Long> {

    public Place(String name, Point location, Address address) {
        this.name = name;
        this.location = location;
        this.address = address;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Point location;

    @Embedded
    private Address address;

}
