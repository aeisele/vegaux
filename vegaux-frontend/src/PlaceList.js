import React, {useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";
import {Paper, TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";

function PlaceList() {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [dir, setDir] = useState('ASC');
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/places?page=${page}&size=${size}&sort=${sort},${dir}`)
            const data = await response.json();
            setPlaces(data.content);
        })();

    }, [page, size, sort, dir]);

    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setSize(event.target.value);
    };

    const createSortHandler = (property) => (event) => {
        handleSort(event, property)
    }

    const handleSort = (event, property) => {
        const isAsc = sort === property && dir === 'ASC';
        setDir(isAsc ? 'DESC' : 'ASC');
        setSort(property);
    };

    const placeItems = places.map(place => {
        return (
            <PlaceListItem key={place.id} place={place} />
        )
    });

    return (
        <Paper>
            <TableContainer component={Paper}>
                <Table aria-label="Places">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={sort === 'name'}
                                    direction={dir === 'ASC' ? 'asc' : 'desc'}
                                    onClick={createSortHandler('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placeItems}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPage={size}
                    count={places.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Paper>
    );

}

export default PlaceList;