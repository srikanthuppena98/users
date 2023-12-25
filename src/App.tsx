import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import LayoutContent from "./app/layout/LayoutContent";


function App() {
        return (
            <Router>
                    <LayoutContent/>
            </Router>
        );
}

export default App;
