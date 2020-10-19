import React, {Fragment} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import PlaceList from "./place/PlaceList";
import PlaceForm from "./place/PlaceForm";
import PlaceMap from "./map/PlaceMap";

const ReactRouter = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/places" component={PlaceList}/>
                <Route path="/places/:placeId" component={PlaceForm}/>
                <Route path="/map" component={PlaceMap}/>
            </Switch>
        </Fragment>
    );
};

export default ReactRouter;