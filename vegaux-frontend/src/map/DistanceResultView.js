import React, {Fragment, useEffect, useState} from 'react'
import {fetchPlacesInDistance} from "../place/PlaceService";
import PlaceMap from "./PlaceMap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        height: '100%'
    },
    mapPaper: {
        padding: theme.spacing(1/2)
    },
}));

const DistanceResultView = () => {

    const [origin] = useState({
        latitude: 48.3668041,
        longitude: 10.8986971
    });
    const [distanceMeters] = useState(25000);
    const [placesInDistance, setPlacesInDistance] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await fetchPlacesInDistance(origin, distanceMeters);
            setPlacesInDistance(result);
        })();
    }, [origin, distanceMeters]);

    const handleResultClick = (id) => {
        setSelectedPlace(id);
    };

    const handleUnselect = () => {
        setSelectedPlace(null);
    }

    const results = placesInDistance.map(result => {
        return (
            <ListItem
                key={result.place.id}
                button
                divider
                onClick={() => handleResultClick(result.place.id)}
            >
                <ListItemText>
                    {result.place.name}
                    <br />
                    {result.distanceMeters}
                </ListItemText>
            </ListItem>
        );
    });

    const classes = useStyles();

    return (
        <Fragment>
            <Grid container spacing={2} className={classes.grid}>
                <Grid item sm={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>Places in a {distanceMeters} meter radius</Typography>
                        <List>
                            {results}
                        </List>
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <Paper className={classes.mapPaper}>
                        <PlaceMap
                            origin={origin}
                            placesInDistance={placesInDistance}
                            selectedPlace={selectedPlace}
                            onClosePopup={handleUnselect}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );

}

export default DistanceResultView;