import React, { Component } from 'react';

import SpeechProvider from '../../providers/SpeechProvider';
import { IPlayListItemProps } from '../../components/playlist/Playlist';

import { Button, Container } from 'react-bootstrap';
import { ReactMic } from 'react-mic';

import Playlist from "../../components/playlist/Playlist";

import './StsPage.scss';

export interface IStsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface IStsPageState {
    record?: boolean;
    blobURL?: any;
    recordedBlob?: any;
}

export default class StsPage extends Component<IStsPageProps, IStsPageState> {

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

                const title = new Date().toString();

                this.props.newItemCallback({
                    title,
                    url,
                    model: 'Whistling',
                    vocoder: 'GriffinLim'
                });
            }
        )
    };

    onSpeak = () => {
        const fd = new FormData();
        fd.append('file', this.state.recordedBlob.blob);
        this.handleSubmit(fd);
    };

    onFileChange = (event: any) => {
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
        } else {
            return (
                <Button onClick={this.startRecording} variant="custom">
                    Start recording
                </Button>
            );
        }
    };

    render() {
        return (
            <section className="Sts">
                <div className="content-wrapper">
                    <h2 className="tts-title">Speech to Speech</h2>
                    <form onSubmit={this.onSpeak}>
                        <Container className="mt-3">
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
                        </Container>
                        <Container className="mt-3">
                            <div className="d-flex justify-content-center mb-3">
                                <this.recordButton />
                                <label className="btn btn-custom">
                                    Upload <input type="file" onChange={this.onFileChange} hidden />
                                </label>
                            </div>
                        </Container>

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
                    <Playlist
                        items={this.props.items}
                    />
                </div>
            </section>
        );
    }
}
