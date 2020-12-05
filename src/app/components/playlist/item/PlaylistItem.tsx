import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';

import './PlaylistItem.scss';

export interface IPlayListItemProps {
    title: string,
    url: string,
    model: string,
    vocoder: string,
}

export enum AudioState {
    IDLE = 0,
    PLAYING,
    PAUSED
}

export interface IPlaylistItemState {
    state: AudioState
    duration?: string
}

export default class PlaylistItem extends Component<IPlayListItemProps, IPlaylistItemState> {

    private audio!: HTMLAudioElement;

    constructor(props: IPlayListItemProps) {
        super(props);

        this.state = {
            state: AudioState.IDLE,
            duration: '0'
        }

        this.audio = new Audio(this.props.url);
        this.audio.onloadedmetadata = () => {
            this.setState({ duration: this.audio.duration.toFixed(2) })
        }
        this.audio.addEventListener("ended", this.onAudioFinished);
    }

    private onAudioPlayClick = () => {
        this.setState({ state: AudioState.PLAYING })
        this.audio.play();
    }

    private onAudioPauseClick = () => {
        this.setState({ state: AudioState.PAUSED })
        this.audio.pause();
    }

    private onAudioFinished = () => {
        this.setState({ state: AudioState.IDLE })
    }

    render() {
        return (
            <tr className="audio-playlist-item">
                <th scope="row">
                    {(() => {
                        switch (this.state.state) {
                            case AudioState.IDLE: 
                            case AudioState.PAUSED: 
                                return <Button variant="link" onClick={this.onAudioPlayClick}>
                                    <AiOutlinePlayCircle/>
                                </Button>;
                            case AudioState.PLAYING:  
                                return <Button variant="link" onClick={this.onAudioPlayClick}>
                                    <AiOutlinePauseCircle/>
                                </Button>;
                        }
                    })()}
                </th>
                <td>{this.props.title}</td>
                <td>{this.props.model}</td>
                <td>{this.props.vocoder}</td>
                <td>{this.state.duration}s</td>
            </tr>
        );
    }
}
