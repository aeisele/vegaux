import React, {Fragment, useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {fetchPlaceById} from "./PlaceService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";

const PlaceSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Too Long!')
        .required(),
    latitude: Yup.number()
        .required(),
    longitude: Yup.number()
        .required()
});

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const PlaceForm = () => {

    const [fetchError, setFetchError] = useState(false);
    const [place, setPlace] = useState({
        name: '',
        location: {
            latitude: '',
            longitude: ''
        }
    });

    const {placeId} = useParams();
    const history = useHistory();

    const isNew = placeId === "new";
    const caption = isNew ? "New Place" : "Edit Place";

    useEffect(() => {
        if (!isNew) {
            (async () => {
                try {
                    const fetched = await fetchPlaceById(placeId);
                    setPlace(fetched);
                } catch (error) {
                    setFetchError(true);
                }
            })();
        }
    }, [placeId, isNew]);

    const goBack = () => {
        history.push("/places");
    };

    const classes = useStyles();

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>{caption} {!isNew && place.name}</Typography>
            <Snackbar open={fetchError}>
                <Alert severity="error">Error fetching place info from server!</Alert>
            </Snackbar>
            <Formik
                initialValues={place}
                enableReinitialize={true}
                validationSchema={PlaceSchema}
                onSubmit={(values, {setSubmitting}) => {
                    // todo
                    setSubmitting(false);
                }}
            >
                {({submitForm, isSubmitting}) => (
                    <Grid container spacing={3}>
                        <Form>

                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="name"
                                    component={TextField}
                                    label="Place Name"
                                    fullWidth
                                />
                                <ErrorMessage name="name" component="div"/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Field
                                    type="number"
                                    name="location.latitude"
                                    component={TextField}
                                    label="Location Latitude"
                                    fullWidth
                                />
                                <ErrorMessage name="location.latitude" component="div"/>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Field
                                    type="number"
                                    name="location.longitude"
                                    component={TextField}
                                    label="Location Longitude"
                                    fullWidth
                                />
                                <ErrorMessage name="location.longitude" component="div"/>
                            </Grid>

                            <div className={classes.buttons}>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting || fetchError}
                                    onClick={submitForm}
                                >
                                    Save
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="secondary"
                                    onClick={(event) => goBack(event)}
                                >
                                    Back
                                </Button>
                            </div>
                        </Form>
                    </Grid>
                )}
            </Formik>
        </Fragment>
    );
};

export default PlaceForm;