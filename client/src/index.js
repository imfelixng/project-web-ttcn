import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import HomeScreen from './screens/Home/components/HomeScreen';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';


const store = createStore(rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

const Home = () => (
    <Router>
        <HomeScreen />
    </Router>
)

ReactDOM.render(
    <Provider store = {store}>
        <Home />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
