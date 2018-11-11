import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import HomeScreen from './screens/Home/components/HomeScreen';
import {BrowserRouter as Router} from "react-router-dom";
const Home = () => (
    <Router>
        <HomeScreen />
    </Router>
)

ReactDOM.render(<Home />, document.getElementById('root'));

serviceWorker.unregister();
