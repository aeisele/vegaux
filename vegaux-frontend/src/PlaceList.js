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
import TableFooter from "@material-ui/core/TableFooter";
import Checkbox from "@material-ui/core/Checkbox";
import TableToolbar from "./TableToolbar";

function PlaceList() {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [dir, setDir] = useState('ASC');
    const [places, setPlaces] = useState([]);
    const [selected, setSelected] = useState([]);

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

    const handleSort = (event, property) => {
        const isAsc = sort === property && dir === 'ASC';
        setDir(isAsc ? 'DESC' : 'ASC');
        setSort(property);
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelected = places.map(place => place.id);
            setSelected(newSelected);
        } else {
            setSelected([]);
        }
    };

    const toggleSelect = (event, id) => {
        const index = selected.indexOf(id);
        let newSelected = [...selected];
        if (index < 0) {
            newSelected.push(id);
        } else {
            newSelected.splice(index, 1);
        }
        setSelected(newSelected);
    };

    const checkSelected = (id) => {
        return selected.indexOf(id) !== -1;
    }

    const onCreate = () => {
        console.log("on create");
    }

    const onEdit = () => {
        console.log("on edit");
    }

    const onDelete = () => {
        console.log("on delete");
    }

    const placeItems = places.map((place, index) => {
        return (
            <PlaceListItem key={place.id}
                           place={place}
                           index={index}
                           handleClick={toggleSelect}
                           checkSelected={checkSelected}
            />
        )
    });

    const numSelected = selected.length;
    const rowCount = places.length;

    return (
        <Paper>
            <TableToolbar
                numSelected={numSelected}
                caption="Places"
                onCreate={onCreate}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <TableContainer>
                <Table aria-label="Places">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={numSelected > 0 && numSelected < rowCount}
                                    checked={rowCount > 0 && numSelected === rowCount}
                                    onChange={handleSelectAll}
                                    inputProps={{'aria-label' : 'select all places'}}
                                />
                            </TableCell>
                            <TableCell
                                align="left"
                                sortDirection={sort === 'name' ? dir.toLowerCase() : false}
                            >
                                <TableSortLabel
                                    active={sort === 'name'}
                                    direction={dir === 'ASC' ? 'asc' : 'desc'}
                                    onClick={(event) => handleSort(event, 'name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">Latitude</TableCell>
                            <TableCell align="right">Longitude</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {placeItems}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPage={size}
                                count={places.length}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Paper>
    );

}

export default PlaceList;