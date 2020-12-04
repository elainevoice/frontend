import React from 'react';

import SpeechProvider from '../../providers/SpeechProvider';

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
        SpeechProvider.requestSpeechByAudio(fd).subscribe(
            (result: any) => {
                const url = window.URL.createObjectURL(new Blob([result]));
                console.log(url);
                //Playlist.addRow(url, undefined);
            }
        )
    };

    onSpeak = () => {
        const fd = new FormData();
        fd.append('file', this.state.recordedBlob.blob);
        this.handleSubmit(fd);
    };
    onFileChange = (event: any) => {
        //this.setState({ selectedFile: event.target.files[0] });
        const fd = new FormData();
        fd.append('file', event.target.files[0]);
        this.handleSubmit(fd);
    };

    recordButton = () => {
        if (this.state.record) {
            return (
                <Button onClick={this.stopRecording} variant="custom">
                    Stop recording
                </Button>
            );
        }
        return (
            <Button onClick={this.startRecording} variant="custom">
                Start recording
            </Button>
        );
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
                                <this.recordButton />
                                <label className="btn btn-custom">
                                    Upload <input type="file" onChange={this.onFileChange} hidden />
                                </label>
                            </div>
                        </div>

                        {
                            //Uitgecomment tot we iets hebben om te kiezen
                            /*<div className="container mt-3">
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
                        </div>*/
                        }
                    </form>
                </div>
            </Container>
        );
    }
}
