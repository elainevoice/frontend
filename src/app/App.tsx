import React, { Component } from 'react';

import { BrowserRouter, Switch, Redirect, Route as ReactRoute } from 'react-router-dom';

import { IPlayListItemProps } from './components/playlist/Playlist';

import GeneralLayout from './layouts/generallayout/GeneralLayout';

import StsPage from './pages/stspage/StsPage';
import TtsPage from './pages/ttspage/TtsPage';

import './App.scss';

import './themes/light-theme.scss';

export interface IAppState {
    items: IPlayListItemProps[];
}

export class App extends Component<any, IAppState> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            items: []
        };
    }

    private onNewItemAdd = (item: IPlayListItemProps):void => {
        const items = this.state.items.map(s => s);
        items.push(item)
        this.setState({
            items: items
        });
    }

    render() {
        return (
            <BrowserRouter basename="/">
                <Switch>
                    <ReactRoute path="/" exact>
                        <Redirect to="/speech-to-speech" />
                    </ReactRoute>
                    <GeneralLayout>
                        <ReactRoute 
                            path="/speech-to-speech" 
                            render={(props) => <StsPage {...props} items={this.state.items} newItemCallback={this.onNewItemAdd}/>}
                            exact 
                        />
                        <ReactRoute 
                            path="/text-to-speech" 
                            render={(props) => <TtsPage {...props} items={this.state.items} newItemCallback={this.onNewItemAdd}/>}
                            exact 
                        />
                    </GeneralLayout>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
