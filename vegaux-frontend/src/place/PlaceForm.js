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
import {Search} from "@material-ui/icons";
import {geoCode} from "../geo/GeoCoder";
import Paper from "@material-ui/core/Paper";
import {useCommonStyles} from "../styles/commonStyles";

const PlaceSchema = Yup.object().shape({
    name: Yup.string()
        .max(255, 'Too Long!')
        .required(),
    location: Yup.object().shape({
        latitude: Yup.number()
            .required('Latitude is required'),
        longitude: Yup.number()
            .required('Longitude is required')
    }),
    address: Yup.object().shape({
        addressLine1: Yup.string()
            .max(255, 'Too Long!')
            .required('Address Line 1 is required'),
        addressLine2: Yup.string()
            .max(255, 'Too Long!'),
        zipCode: Yup.string()
            .max(25, 'Too Long!')
            .required('Zip Code is required'),
        city: Yup.string()
            .max(255, 'Too Long!')
            .required('City is required'),
        state: Yup.string()
            .max(255, 'Too Long!'),
        country: Yup.string()
            .max(255, 'Too Long!')
            .required('Country is required')
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
    const [busy, setBusy] = useState(false);
    const [place, setPlace] = useState({
        id: '',
        name: '',
        location: {
            latitude: '',
            longitude: ''
        },
        address: {
            addressLine1: '',
            addressLine2: '',
            zipCode: '',
            city: '',
            state: '',
            country: ''
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

    const handleClickGeoCode = async (values, setFieldValue) => {
        setBusy(true);
        const geoLocation = await geoCode(values.address);
        console.log(geoLocation);
        if (geoLocation) {
            setFieldValue('location.latitude', geoLocation.latitude);
            setFieldValue('location.longitude', geoLocation.longitude);
        }
        setBusy(false);
    }

    const handleSubmit = async (values, actions) => {
        try {
            const saved = await savePlace(values)
            setPlace(saved);
        } catch (error) {
            console.log(error);
            setFetchError(true);
        }
        actions.setSubmitting(false);
        if (isNew) {
            goBack();
        }
    };

    const commonClasses = useCommonStyles();
    const classes = useStyles();

    return (
        <Fragment>
            <Paper className={commonClasses.fullPaper}>
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
                    {({
                          submitForm,
                          isSubmitting,
                          values,
                          setFieldValue
                      }) => (
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

                                <Grid item xs={12}>
                                    <Field
                                        type="text"
                                        name="address.addressLine1"
                                        component={TextField}
                                        label="Address line 1"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        type="text"
                                        name="address.addressLine2"
                                        component={TextField}
                                        label="Address line 2"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        type="text"
                                        name="address.zipCode"
                                        component={TextField}
                                        label="Zip / Postal code"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        type="text"
                                        name="address.city"
                                        component={TextField}
                                        label="City"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        type="text"
                                        name="address.state"
                                        component={TextField}
                                        label="State"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <Field
                                        type="text"
                                        name="address.country"
                                        component={TextField}
                                        label="Country"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={6} align="right">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<Search/>}
                                        onClick={() => handleClickGeoCode(values, setFieldValue)}
                                    >
                                        Lookup Geo Location
                                    </Button>
                                </Grid>

                                <Grid item xs={3}>
                                    <Field
                                        type="number"
                                        name="location.latitude"
                                        component={TextField}
                                        label="Location Latitude"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={3}>
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
                                    {(isSubmitting || busy) && <LinearProgress/>}
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
            </Paper>
        </Fragment>
    );
};

export default PlaceForm;