import React, { Component } from 'react';

import './TtsPage.scss';
import { Container } from 'react-bootstrap';
import { IPlayListItemProps } from '../../components/playlist/Playlist';

import Playlist from "../../components/playlist/Playlist";

import SpeechProvider from '../../providers/SpeechProvider';

import ModelSelector from '../../components/model_selector/ModelSelector';
import {Model} from '../../providers/SpeechProvider'

export interface ITtsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface ITtsPageState {
    value: string;
    selected_model: string;
}

export default class TtsPage extends Component<ITtsPageProps, ITtsPageState> {
    playing: boolean;

    constructor(props: any) {
        super(props);

        this.playing = false;

        this.state = {
            value: '',
            selected_model: 'ljspeech'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        var savedText = this.state.value;
        let selectedModel : string = this.state.selected_model;
        
        SpeechProvider.requestSpeechByText(savedText, selectedModel as Model).subscribe(
            (result: any) => {
                const url = window.URL.createObjectURL(new Blob([result]));

                const title = savedText ?? new Date().toString();

                this.props.newItemCallback({
                    title,
                    url,
                    model: selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1),
                    vocoder: 'GriffinLim'
                });
            }
        )

        event.preventDefault();
    }

    public setSelectedModelState = (value: string) =>{
        console.log(value)
        this.setState({selected_model: value})
    }

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
                        <ModelSelector setSelectedModelState={this.setSelectedModelState} />
                        <br></br>
                        <input className="translate-btn" type="submit" value="Translate" />
                    </form>
                </div>
                <Playlist
                    items={this.props.items}
                />
            </section>
        );
    }
}
