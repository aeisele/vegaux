import React, {useEffect, useState} from 'react';
import './App.css';
import PlaceList from "./PlaceList";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <PlaceList />
            </header>
        </div>
    );
}

export default App;
