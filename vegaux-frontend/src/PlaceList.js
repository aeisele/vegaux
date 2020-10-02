import React, {useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";
import {Paper, TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";

function PlaceList() {

    const [places, setPlaces] = useState([])
    const [page, setPage] = useState({})

    useEffect(() => {
        fetch("/api/places")
            .then(response => response.json())
            .then(data => {
                setPage(data);
                setPlaces(data.content);
            });
    }, []);

    const placeItems = places.map(place => {
        return (
            <PlaceListItem key={place.id} place={place} />
        )
    });

    const handleChangePage = (event) => {
        console.log(event);
    }

    const handleChangeRowsPerPage = (event) => {
        console.log(event);
    }

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table aria-label="Places">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placeItems}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPage={page.size}
                    count={page.numberOfElements}
                    page={page.number}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );

}

export default PlaceList;