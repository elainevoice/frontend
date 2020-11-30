import Axios from 'axios';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { ReactMic } from 'react-mic';
import Playlist from '../playlist/Playlist';
import './Record.scss';

export class Record extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            record: false,
        };
    }

    startRecording = () => {
        this.setState({
            record: true,
        });
    };

    stopRecording = () => {
        this.setState({
            record: false,
        });
    };

    onStop = (recordedBlob: { blobURL: any }) => {
        const self = this;
        console.log(recordedBlob);
        self.setState({
            blobURL: recordedBlob.blobURL,
            recordedBlob: recordedBlob,
        });

        this.handleSubmit();
    };

    downloadRecording() {
        let newBlob = new Blob(this.state.recordedBlob, { type: 'audio/wav' });
    }

    async handleSubmit() {
        const fd = new FormData();
        fd.append('file', this.state.recordedBlob.blob);

        Axios({
            url: 'http://localhost:8000/api/taco_audio', // point to NGINX config
            method: 'POST',
            responseType: 'blob',
            headers: { 'content-type': 'multipart/form-data' },
            data: fd,
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            Playlist.addRow(url, undefined);
        });
    }

    onData(e: any) {
        console.log('data: ', e);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <Container>
                <div id="content-wrapper">
                    <h2 className="tts-title">Speech to Speech</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="container mt-3">
                            <div className="d-flex justify-content-center mb-3">
                                <ReactMic
                                    record={this.state.record}
                                    className="sound-wave"
                                    onStop={this.onStop}
                                    onData={this.onData}
                                    strokeColor="#111"
                                    mimeType="audio/wav"
                                    backgroundColor="white"
                                />
                            </div>
                        </div>
                        <div className="container mt-3">
                            <div className="d-flex justify-content-center mb-3">
                                <Button onClick={this.startRecording} variant="custom">
                                    Start recording
                                </Button>
                                <Button onClick={this.stopRecording} variant="custom">
                                    Stop recording
                                </Button>
                            </div>
                        </div>
                        <div className="container mt-3">
                            <div className="d-flex justify-content-center mb-3">
                                <div className="options-wrapper">
                                    <select defaultValue="whistling" name="models" id="models" className="options">
                                        <option value="" disabled>
                                            Select a model
                                        </option>
                                        <option value="whistling">Whistling</option>
                                        <option value="xhosa" disabled>
                                            Xhosa
                                        </option>
                                        <option value="human" disabled>
                                            Human
                                        </option>
                                    </select>
                                    <select defaultValue="griffinlim" name="vocoders" id="vocoders" className="options">
                                        <option value="" disabled>
                                            Select a vocoder
                                        </option>
                                        <option value="griffinlim">GriffinLim</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        );
    }
}
