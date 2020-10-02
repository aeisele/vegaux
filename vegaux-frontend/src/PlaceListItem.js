import React from "react";

function PlaceListItem(props) {
    const place = props.place;
    const location = place.location;
    return (
        <tr>
            <td>{place.name}</td>
            <td>{location.latitude}</td>
            <td>{location.longitude}</td>
        </tr>
    );
}

export default PlaceListItem;