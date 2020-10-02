import React, {useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";

function PlaceList() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch("/api/places")
            .then(response => response.json())
            .then(data => setPlaces(data.content));
    }, []);

    const placeItems = places.map(place => {
        return (
            <PlaceListItem key={place.id} place={place} />
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {placeItems}
            </tbody>
        </table>
    );

}

export default PlaceList;