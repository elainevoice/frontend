import React, { Component } from 'react';

import './TtsPage.scss';
import { Container } from 'react-bootstrap';
import { IPlayListItemProps } from '../../components/playlist/Playlist';

import SpeechProvider from '../../providers/SpeechProvider';

export default class TtsPage extends Component<{}, { value: string }> {
    playing: boolean;

    private items: IPlayListItemProps[] = [];

    constructor(props: any) {
        super(props);

        this.playing = false;
        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        var savedText = this.state.value;
        
        SpeechProvider.requestSpeechByText(savedText).subscribe(
            (result: any) => {
                const url = window.URL.createObjectURL(new Blob([result]));
                //Playlist.addRow(url, savedText);
            }
        )

        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <div id="content-wrapper">
                    <h2 className="tts-title">Text to Speech</h2>
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                            className="taco-text"
                            placeholder="Fill in the text you want to have translated..."
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <br></br>
                        <input className="translate-btn" type="submit" value="Translate" />
                    </form>
                </div>
            </Container>
        );
    }
}
