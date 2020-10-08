import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import ReactRouter from "./Routes";

function App() {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <ReactRouter/>
            </Box>
        </Container>
    );
}

export default App;
