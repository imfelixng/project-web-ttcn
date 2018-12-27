import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import HomeScreen from './screens/Home/components/HomeScreen';
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer,
        compose(
            applyMiddleware(thunk)
        )
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

if(module.hot) {
    module.hot.accept();
}

serviceWorker.unregister();
