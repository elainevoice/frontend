import React, { Component } from 'react';

import './StsPage.scss';
import Playlist from '../../components/playlist/Playlist';

export default class HomePage extends Component<any, any> {

    render() {
        return (
            <section className="Sts">
                <Playlist items={[{title: "test", model: "test", vocoder: "test", duration: "test"}]}/>
            </section>
        );
    }
}
