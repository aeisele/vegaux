import React, {Fragment} from 'react';
import ReactRouter from "./Routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
}));

function App() {

    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="static" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        VEGAUX
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <ReactRouter/>
            </main>
        </Fragment>
    );
}

export default App;
