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
        this.setState({
            blobURL: recordedBlob.blobURL,
            recordedBlob: recordedBlob,
        });

        this.onSpeak();
    };

    handleSubmit = (fd: FormData) => {
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
    };

    onSpeak = () => {
        const fd = new FormData();
        fd.append('file', this.state.recordedBlob.blob);
        this.handleSubmit(fd);
    };

    onUpload = () => {
        const fd = new FormData();
        fd.append('file', this.state.selectedFile);
        this.handleSubmit(fd);
    };
    onFileChange = (event: any) => {
        // Update the state
        console.log(event);
        this.setState({ selectedFile: event.target.files[0] });
    };

    render() {
        return (
            <Container>
                <div id="content-wrapper">
                    <h2 className="tts-title">Speech to Speech</h2>
                    <form onSubmit={this.onSpeak}>
                        <div className="container mt-3">
                            <div className="d-flex justify-content-center mb-3">
                                <ReactMic
                                    record={this.state.record}
                                    className="sound-wave"
                                    onStop={this.onStop}
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
                                <label className="btn btn-custom2">
                                    Browse <input type="file" onChange={this.onFileChange} hidden />
                                </label>
                                <Button onClick={this.onUpload} variant="custom2">
                                    Upload
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
