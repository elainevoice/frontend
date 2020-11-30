import React, { Component } from 'react';

import './TtsPage.scss';
import Axios from 'axios';
import { Container } from 'react-bootstrap';
import Playlist from '../../components/playlist/Playlist';

export default class TtsPage extends Component<{}, { value: string }> {
    playing: boolean;

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
        Axios({
            url: 'http://localhost:8000/api/taco',
            method: 'POST',
            responseType: 'blob',
            data: {
                text: this.state.value,
            },
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            Playlist.addRow(url, savedText);
        });

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
                        <div className="options-wrapper">
                            <select defaultValue="whistling" name="models" id="models" className="select-btn">
                                <option value="" disabled>
                                    Select a model...
                                </option>
                                <option value="whistling">Whistling</option>
                                <option value="xhosa" disabled>
                                    Xhosa
                                </option>
                                <option value="human" disabled>
                                    Human
                                </option>
                            </select>
                            <select defaultValue="griffinlim" name="vocoders" id="vocoders" className="select-btn">
                                <option value="" disabled>
                                    Select a vocoder...
                                </option>
                                <option value="griffinlim">GriffinLim</option>
                            </select>
                        </div>
                        <br></br>
                        <input className="translate-btn" type="submit" value="Translate" />
                    </form>
                </div>
            </Container>
        );
    }
}
