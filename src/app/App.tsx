import React, { Component } from 'react';

import { BrowserRouter, Switch, Redirect, Route as ReactRoute } from 'react-router-dom';

import Route from './modules/RouteModule';

import GeneralLayout from './layouts/generallayout/GeneralLayout';

import StsPage from './pages/stspage/StsPage';
import TtsPage from './pages/ttspage/TtsPage';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

export class App extends Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ReactRoute path="/" exact>
                        <Redirect to="/speech-to-speech" />
                    </ReactRoute>
                    <Route layout={GeneralLayout} path="/speech-to-speech" component={StsPage} exact />
                    <Route layout={GeneralLayout} path="/text-to-speech" component={TtsPage} exact />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
