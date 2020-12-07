import React, { Component } from 'react';

import SpeechProvider from '../../providers/SpeechProvider';
import { IPlayListItemProps } from '../../components/playlist/Playlist';

import { Button, Container } from 'react-bootstrap';
import { ReactMic } from 'react-mic';

import Playlist from "../../components/playlist/Playlist";

import './StsPage.scss';

import ModelSelector from '../../components/model_selector/ModelSelector';
import {Model} from '../../providers/SpeechProvider'

export interface IStsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface IStsPageState {
    record?: boolean;
    blobURL?: any;
    recordedBlob?: any;
    selected_model: string;
}

export default class StsPage extends Component<IStsPageProps, IStsPageState> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            record: false,
            selected_model: 'ljspeech',
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
        let selectedModel : string = this.state.selected_model;

        SpeechProvider.requestSpeechByAudio(fd, selectedModel as Model).subscribe(
            (result: any) => {
                const url = window.URL.createObjectURL(new Blob([result]));

                const title = new Date().toString();

                this.props.newItemCallback({
                    title,
                    url,
                    model: selectedModel,
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

    public setSelectedModelState = (value: string) =>{
        this.setState({selected_model: value})
    }

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
                    </form>
                    <ModelSelector setSelectedModelState={this.setSelectedModelState} />
                    <Playlist
                        items={this.props.items}
                    />
                </div>
            </section>
        );
    }
}
