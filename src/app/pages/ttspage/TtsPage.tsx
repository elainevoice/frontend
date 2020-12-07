import React, { Component } from 'react';
import SpeechProvider from '../../providers/SpeechProvider';
import { ScaleLoader } from 'react-spinners';
import { Alert, Container } from 'react-bootstrap';
import { css } from '@emotion/core';

import './TtsPage.scss';

import { IPlayListItemProps } from '../../components/playlist/Playlist';
import Playlist from '../../components/playlist/Playlist';

export interface ITtsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface ITtsPageState {
    value: string;
    loading: boolean;
    error?: string;
}

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default class TtsPage extends Component<ITtsPageProps, ITtsPageState> {
    playing: boolean;

    constructor(props: any) {
        super(props);

        this.playing = false;

        this.state = {
            value: '',
            loading: false,
            error: undefined,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        // Dont spam requests.
        if (this.state.loading === true) {
            return;
        }

        this.setState({
            loading: true,
            error: undefined,
        });

        var savedText = this.state.value;

        SpeechProvider.requestSpeechByText(savedText).subscribe(
            (result: any) => {
                const url = window.URL.createObjectURL(new Blob([result]));

                const title = savedText ?? new Date().toString();

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
            async (error: any) => {
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

        event.preventDefault();
    }

    renderError = () => {
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
                <Playlist items={this.props.items} />
            </section>
        );
    }
}
