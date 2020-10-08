import React, {Fragment} from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./Home";
import PlaceList from "./PlaceList";
import PlaceForm from "./PlaceForm";

const ReactRouter = () => {
    return (
        <Fragment>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/places" component={PlaceList}/>
                <Route path="/places/:placeId" component={PlaceForm}/>
            </Switch>
        </Fragment>
    );
};

export default ReactRouter;