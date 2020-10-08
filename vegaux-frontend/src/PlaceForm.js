import React from "react";
import {useParams} from "react-router-dom";

const PlaceForm = () => {

    const {placeId} = useParams();

    return (
        <h1>Place Form for {placeId}</h1>
    );
};

export default PlaceForm;