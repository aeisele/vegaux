import React, {Fragment} from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <header>
                <h1>Menu</h1>
            </header>
            <ul>
                <li>
                    <Link to="/places">Place List</Link>
                </li>
            </ul>
        </Fragment>
    );
};

export default Home;