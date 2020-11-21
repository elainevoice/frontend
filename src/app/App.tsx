import React, { Component } from 'react'

import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './modules/RouteModule';

import GeneralLayout from './layouts/generallayout/GeneralLayout';
import BarLayout from './layouts/barlayout/BarLayout';

import HomePage from './pages/homepage/HomePage';
import FormPage from './pages/formpage/FormPage';
import TtsPage from './pages/ttspage/TtsPage';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';

export class App extends Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route layout={GeneralLayout} path="/" component={HomePage} exact/>
                    <Route layout={BarLayout} path="/form" component={FormPage} exact/>
                    <Route layout={BarLayout} path="/tts" component={TtsPage} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
