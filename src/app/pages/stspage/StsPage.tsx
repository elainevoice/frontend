import React, { Component } from 'react';

import SpeechProvider from '../../providers/SpeechProvider';
import { IPlayListItemProps } from '../../components/playlist/Playlist';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Button, Container } from 'react-bootstrap';
import { ReactMic } from 'react-mic';
import { css } from '@emotion/core';
import Alert from 'react-bootstrap/Alert';

import Playlist from '../../components/playlist/Playlist';

import './StsPage.scss';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export interface IStsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface IStsPageState {
    record?: boolean;
    blobURL?: any;
    recordedBlob?: any;
    loading: boolean;
    error?: string;
}

export default class StsPage extends Component<IStsPageProps, IStsPageState> {
    constructor(props: any) {
        super(props);

        this.state = {
            record: false,
            loading: false,
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
        // Dont spam requests.
        if (this.state.loading === true) {
            return;
        }

        this.setState({
            loading: true,
            error: undefined,
        });

        SpeechProvider.requestSpeechByAudio(fd).subscribe(
            (result) => {
                const url = window.URL.createObjectURL(new Blob([result]));

                const title = new Date().toString();

                this.props.newItemCallback({
                    title,
                    url,
                    model: 'Whistling',
                    vocoder: 'GriffinLim',
                });

                this.setState({
                    loading: false,
                });
            },
            async (error) => {
                console.log(error);
                let errorStr = 'Something went wrong.';
                if (error?.response?.data?.text()) {
                    const errorText = await error.response.data.text();
                    let errorObj = JSON.parse(errorText);
                    errorStr = errorObj['detail'];
                }
                this.setState({
                    loading: false,
                    error: errorStr,
                });
            }
        );
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

    renderError = () => {
        console.log(this.state.error);
        if (this?.state?.error) {
            return (
                <Alert variant="danger" onClose={() => this.setState({ error: undefined })} dismissible>
                    <p>{this.state.error}</p>
                </Alert>
            );
        }
        return <div></div>;
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
                                    Upload <input type="file" accept=".wav" onChange={this.onFileChange} hidden />
                                </label>
                            </div>
                        </Container>
                        <Container className="mt-3">
                            <div className="container mt-3">
                                <div className="d-flex justify-content-center mb-3">
                                    <ScaleLoader
                                        css={override}
                                        height={20}
                                        width={4}
                                        radius={2}
                                        margin={2}
                                        color={'#0be881'}
                                        loading={this.state.loading}
                                    />
                                    <this.renderError />
                                </div>
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
                    <Playlist items={this.props.items} />
                </div>
            </section>
        );
    }
}
