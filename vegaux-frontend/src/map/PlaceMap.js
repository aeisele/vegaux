import React, {Fragment, useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import {fetchPlacesInDistance} from "../place/PlaceService";

const PlaceMap = () => {

    const [origin] = useState({
        latitude: 48.3668041,
        longitude: 10.8986971
    });
    const [zoom] = useState(12);
    const [distanceMeters] = useState(25000);
    const [placesInDistance, setPlacesInDistance] = useState([]);

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
        (async () => {
            const result = await fetchPlacesInDistance(origin, distanceMeters);
            setPlacesInDistance(result);
        })();
    }, [origin, distanceMeters]);

    const markers = placesInDistance.map((distanceResult) => {
        const place = distanceResult.place;
        return (
            <Marker key={place.id} position={[place.location.latitude, place.location.longitude]}>
                <Popup>
                    {place.name}
                    <br />
                    {distanceResult.distanceMeters}
                </Popup>
            </Marker>
        );
    });

    return (
        <Fragment>
            <Map center={[origin.latitude, origin.longitude]} zoom={zoom} style={{height: 250}}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers}
            </Map>
        </Fragment>
    )
};

export default PlaceMap;