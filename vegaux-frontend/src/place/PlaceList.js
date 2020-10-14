import React, {Fragment, useEffect, useState} from 'react';
import PlaceListItem from "./PlaceListItem";
import {TableContainer} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableFooter from "@material-ui/core/TableFooter";
import Checkbox from "@material-ui/core/Checkbox";
import TableToolbar from "../TableToolbar";
import {deletePlace, fetchPlaces} from "./PlaceService";
import {useHistory} from "react-router-dom";
import Spinner from "../Spinner";

function PlaceList() {

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('name');
    const [dir, setDir] = useState('ASC');
    const [places, setPlaces] = useState([]);
    const [selected, setSelected] = useState([]);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        (async () => {
            const data = await fetchPlaces(page, size, sort, dir);
            setPlaces(data.content);
        })();

    }, [page, size, sort, dir]);

    const history = useHistory();

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

    const handleCreate = () => {
        history.push("/places/new");
    }

    const handleEdit = () => {
        const id = selected[0];
        history.push(`/places/${id}`);
    }

    const handleDelete = async () => {
        setBusy(true);
        try {
            await Promise.all(selected.map(async (id) => {
                await deletePlace(id);
            }))
        } catch (error) {
            console.log(error);
        }
        setBusy(false);
        history.go(0);
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
        <Fragment>
            <Spinner show={busy}/>
            <TableToolbar
                numSelected={numSelected}
                caption="Places"
                itemName="place"
                onCreate={handleCreate}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
        </Fragment>
    );

}

export default PlaceList;