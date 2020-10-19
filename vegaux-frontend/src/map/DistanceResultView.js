import React, {Fragment, useEffect, useState} from 'react'
import {fetchPlacesInDistance} from "../place/PlaceService";
import PlaceMap from "./PlaceMap";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/styles";

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

    useEffect(() => {
        (async () => {
            const result = await fetchPlacesInDistance(origin, distanceMeters);
            setPlacesInDistance(result);
        })();
    }, [origin, distanceMeters]);

    const results = placesInDistance.map(result => {
        return (
            <li>
                {result.place.name}
                <br />
                {result.distanceMeters}
            </li>
        );
    });

    const classes = useStyles();

    return (
        <Fragment>
            <Grid container spacing={2} className={classes.grid}>
                <Grid item sm={4}>
                    <Paper className={classes.paper}>
                        <ul>
                            {results}
                        </ul>
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <Paper className={classes.mapPaper}>
                        <PlaceMap
                            origin={origin}
                            placesInDistance={placesInDistance}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );

}

export default DistanceResultView;