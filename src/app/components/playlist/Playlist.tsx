import React, { Component } from 'react';

import './Playlist.scss';

import { Container, Table } from 'react-bootstrap';

export interface IPlayListItemProps {
    title: string,
    model: string,
    vocoder: string,
    duration: string
}

export interface IPlayListProps {
    items: IPlayListItemProps[]
}

export default class Playlist extends Component<IPlayListProps, any> {
    render() {
        return (
            <Container>
                <div id="audio-playlist">
                    <hr></hr>
                    <h3>Playlist</h3>
                    <Table id="playlist-table">
                        <thead>
                            <tr>
                                <th>&zwnj;</th>
                                <th>Title</th>
                                <th>Model</th>
                                <th>Vocoder</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.items.map((item: IPlayListItemProps, index: Number) => (
                                    <tr>
                                        <td>0</td>
                                        <td>{item.title}</td>
                                        <td>{item.model}</td>
                                        <td>{item.vocoder}</td>
                                        <td>{item.duration}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}
