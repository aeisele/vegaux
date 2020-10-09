import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

function PlaceListItem(props) {
    const place = props.place;
    const location = place.location;
    const handleClick = props.handleClick;
    const isItemSelected = props.checkSelected(place.id);

    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, place.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            selected={isItemSelected}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{'aria-labelledby' : `table-checkbox-${props.index}`}}
                />
            </TableCell>
            <TableCell align="left">{place.name}</TableCell>
            <TableCell align="right">{location.latitude}</TableCell>
            <TableCell align="right">{location.longitude}</TableCell>
        </TableRow>
    );
}

export default PlaceListItem;