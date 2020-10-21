import React, {createRef, Fragment, useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        width: '100%',
        height: '80vh'
    }
}));

const PlaceMap = (props) => {

    const {origin, placesInDistance, selectedPlace, onClosePopup} = props;

    const [zoom] = useState(13);

    const markerRefs = {};

    useEffect(() => {
        const L = require('leaflet');

        delete L.Icon.Default.prototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png")
        });
    }, []);

    useEffect(() => {
        if (markerRefs[selectedPlace]) {
            const marker = markerRefs[selectedPlace].current;
            if (marker != null) {
                marker.leafletElement.openPopup();
            }
        }
    }, [markerRefs, selectedPlace]);

    const markers = placesInDistance.map((distanceResult) => {
        const place = distanceResult.place;
        const markerRef = createRef();
        markerRefs[place.id] = markerRef;
        return (
            <Marker
                key={place.id}
                position={[place.location.latitude, place.location.longitude]}
                ref={markerRef}
            >
                <Popup onClose={onClosePopup}>
                    {place.name}
                    <br/>
                    {distanceResult.distanceMeters}
                </Popup>
            </Marker>
        );
    });

    const classes = useStyles();

    return (
        <Fragment>
            <div>
                <Map center={[origin.latitude, origin.longitude]}
                     zoom={zoom}
                     className={classes.mapContainer}
                >
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers}
                </Map>
            </div>
        </Fragment>
    )
};

export default PlaceMap;