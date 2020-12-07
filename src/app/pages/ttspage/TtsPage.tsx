import React, { Component } from 'react';

import './TtsPage.scss';
import { Container } from 'react-bootstrap';
import { IPlayListItemProps } from '../../components/playlist/Playlist';

import Playlist from "../../components/playlist/Playlist";

import SpeechProvider from '../../providers/SpeechProvider';

import ModelSelector from '../../components/model_selector/ModelSelector';
export interface ITtsPageProps {
    items: IPlayListItemProps[];
    newItemCallback: (item: IPlayListItemProps) => void;
}

export interface ITtsPageState {
    value: string;
}

export default class TtsPage extends Component<ITtsPageProps, ITtsPageState> {
    playing: boolean;

    constructor(props: any) {
        super(props);

        this.playing = false;

        this.state = {
            value: ''
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

                const title = savedText ?? new Date().toString();

                this.props.newItemCallback({
                    title,
                    url,
                    model: 'Whistling',
                    vocoder: 'GriffinLim'
                });
            }
        )

        event.preventDefault();
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
                        {
                            //Uitgecomment tot we iets hebben om te kiezen
                            /*<div className="options-wrapper">
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
                        </div>*/
                        }
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
