import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import PlaceList from "./PlaceList";

function App() {
    return (
        <Container maxWidth="lg">
            <Box my={4}>
                <PlaceList/>
            </Box>
        </Container>
    );
}

export default App;
