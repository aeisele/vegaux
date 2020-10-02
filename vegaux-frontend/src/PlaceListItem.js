import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

function PlaceListItem(props) {
    const place = props.place;
    const location = place.location;
    return (
        <TableRow>
            <TableCell>{place.name}</TableCell>
            <TableCell>{location.latitude}</TableCell>
            <TableCell>{location.longitude}</TableCell>
        </TableRow>
    );
}

export default PlaceListItem;