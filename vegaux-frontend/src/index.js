import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto'
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {BrowserRouter} from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        secondary: {
            main: '#0094ff'
        }
    }
});

ReactDOM.render(
    <div>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </div>,
    document.querySelector('#root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
