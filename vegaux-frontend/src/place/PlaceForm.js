import React, {Fragment, useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import {fetchPlaceById, savePlace} from "./PlaceService";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const PlaceSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Too Long!')
        .required(),
    location: Yup.object().shape({
        latitude: Yup.number()
            .required('Latitude is required'),
        longitude: Yup.number()
            .required('Longitude is required')
    })
});

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    }
}));

const PlaceForm = () => {

    const [fetchError, setFetchError] = useState(false);
    const [place, setPlace] = useState({
        id: '',
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
                    console.log(error);
                    setFetchError(true);
                }
            })();
        }
    }, [placeId, isNew]);

    const goBack = () => {
        history.push("/places");
    };

    const handleSubmit = async (values, actions) => {
        try {
            const saved = await savePlace(values)
            setPlace(saved);
        } catch (error) {
            console.log(error);
            setFetchError(true);
        }
        actions.setSubmitting(false);
    };

    const classes = useStyles();

    return (
        <Fragment>
            <Typography variant="h6" gutterBottom>{caption} {!isNew && place.name}</Typography>
            <Snackbar open={fetchError}>
                <Alert severity="error">Error communicating with server!</Alert>
            </Snackbar>
            <Formik
                initialValues={place}
                enableReinitialize={true}
                validationSchema={PlaceSchema}
                onSubmit={handleSubmit}
            >
                {({submitForm, isSubmitting}) => (
                    <Form>
                        <Grid container spacing={2}>

                            {!isNew && (
                                <Grid item xs={12}>
                                    <Field
                                        type="text"
                                        name="id"
                                        component={TextField}
                                        label="Place Id"
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                            )}

                            <Grid item xs={12}>
                                <Field
                                    type="text"
                                    name="name"
                                    component={TextField}
                                    label="Place Name"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    type="number"
                                    name="location.latitude"
                                    component={TextField}
                                    label="Location Latitude"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field
                                    type="number"
                                    name="location.longitude"
                                    component={TextField}
                                    label="Location Longitude"
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {isSubmitting && <LinearProgress/>}
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
                        </Grid>
                    </Form>
                )}
            </Formik>
        </Fragment>
    );
};

export default PlaceForm;