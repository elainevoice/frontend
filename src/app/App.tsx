import React, { Component } from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './modules/RouteModule';

import GeneralLayout from './layouts/generallayout/GeneralLayout';
import HomePage from './pages/homepage/HomePage';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

export class App extends Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route layout={GeneralLayout} path="/" component={HomePage} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
