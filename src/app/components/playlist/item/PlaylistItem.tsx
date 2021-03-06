import React, { Component } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { HiDownload } from 'react-icons/hi';

import './PlaylistItem.scss';

export interface IPlayListItemProps {
    title: string;
    url: string;
    model: string;
    vocoder: string;
}

export enum AudioState {
    IDLE = 0,
    PLAYING,
    PAUSED,
}

export interface IPlaylistItemState {
    state: AudioState;
    duration?: string;
}

export default class PlaylistItem extends Component<IPlayListItemProps, IPlaylistItemState> {
    private audio!: HTMLAudioElement;

    constructor(props: IPlayListItemProps) {
        super(props);

        this.state = {
            state: AudioState.IDLE,
            duration: '0',
        };

        this.audio = new Audio(this.props.url);
    }

    componentDidMount() {
        this.audio.onloadedmetadata = () => {
            this.setState({ duration: this.audio.duration.toFixed(2) });
        };
        this.audio.addEventListener('ended', this.onAudioFinished);
    }

    private showLimitedTitle = (title: string, limit: number): string => {
        if (!title) {
            title = new Date().toString();
        }
        return title.length > limit ? title.substring(0, limit) + '...' : title;
    };

    private onAudioPlayClick = () => {
        this.setState({ state: AudioState.PLAYING });
        this.audio.play();
    };

    private onAudioPauseClick = () => {
        this.setState({ state: AudioState.PAUSED });
        this.audio.pause();
    };

    private onAudioFinished = () => {
        this.setState({ state: AudioState.IDLE });
    };

    render() {
        return (
            <tr className="audio-playlist-item">
                <th scope="row">
                    {(() => {
                        switch (this.state.state) {
                            case AudioState.IDLE:
                            case AudioState.PAUSED:
                                return (
                                    <button onClick={this.onAudioPlayClick} className="transparentButton">
                                        <AiOutlinePlayCircle />
                                    </button>
                                );
                            case AudioState.PLAYING:
                                return (
                                    <button onClick={this.onAudioPauseClick} className="transparentButton">
                                        <AiOutlinePauseCircle />
                                    </button>
                                );
                        }
                    })()}
                </th>
                <td>{this.showLimitedTitle(this.props.title, 25)}</td>
                <td>{this.props.model.charAt(0).toUpperCase() + this.props.model.slice(1)}</td>
                <td>{this.props.vocoder}</td>
                <td>{this.state.duration}s</td>
                <td>
                    <a
                        className="downloadLink"
                        href={this.props.url}
                        title={this.showLimitedTitle(this.props.title, 25)}
                        download={this.showLimitedTitle(this.props.title, 25) + '.wav'}
                    >
                        <HiDownload />
                    </a>
                </td>
            </tr>
        );
    }
}
