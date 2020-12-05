import React, { Component } from 'react';

import { BrowserRouter, Switch, Redirect, Route as ReactRoute } from 'react-router-dom';

import Route from './modules/RouteModule';

import GeneralLayout from './layouts/generallayout/GeneralLayout';

import StsPage from './pages/stspage/StsPage';
import TtsPage from './pages/ttspage/TtsPage';

import './App.scss';

import './themes/light-theme.scss';

export class App extends Component<any, any> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <ReactRoute path="/" exact>
                        <Redirect to="/speech-to-speech" />
                    </ReactRoute>
                    <GeneralLayout>
                        <ReactRoute path="/speech-to-speech" component={StsPage} exact />
                        <ReactRoute path="/text-to-speech" component={TtsPage} exact />
                    </GeneralLayout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
