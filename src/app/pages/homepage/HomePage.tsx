import React, { Component } from 'react';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import './HomePage.scss';
import TtsPage from '../ttspage/TtsPage';
import { Record } from '../../components/record/Record';
import Playlist from '../../components/playlist/Playlist';

export default class HomePage extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { isVoice: true };
    }

    showComponent(props: any) {
        const voice = props.isVoice;
        if (voice) {
            return <Record />;
        }
        return <TtsPage />;
    }
    render() {
        return (
            <div className="body">
                <div className="container mt-3">
                    <div className="d-flex justify-content-end mb-3">
                        <BootstrapSwitchButton
                            checked={true}
                            onlabel="Voice"
                            onstyle="warning"
                            offstyle="warning"
                            offlabel="Text"
                            width={100}
                            onChange={(checked: boolean) => {
                                this.setState({ isVoice: checked });
                            }}
                        />
                    </div>
                </div>
                <this.showComponent isVoice={this.state.isVoice} />
                <Playlist />
            </div>
        );
    }
}
