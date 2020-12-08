import React, { Component } from 'react';

import { Container, Table } from 'react-bootstrap';

import PlaylistItem, { IPlayListItemProps } from './item/PlaylistItem';

import { AiOutlineClockCircle } from 'react-icons/ai';

import './Playlist.scss';

export type { IPlayListItemProps };

export interface IPlayListProps {
    items: IPlayListItemProps[];
}

export default class Playlist extends Component<IPlayListProps, any> {
    render() {
        return (
            <Container className="audio-playlist-wrapper">
                <div className="audio-playlist">
                    <hr></hr>
                    <h3>Playlist</h3>
                    <Table className="playlist-table" striped hover>
                        <thead>
                            <tr>
                                <th style={{ maxWidth: 50, width: 50 }}>&zwnj;</th>
                                <th style={{ width: 400, maxWidth: 400 }}>Title</th>
                                <th style={{ width: '25%' }}>Model</th>
                                <th style={{ width: '25%' }}>Vocoder</th>
                                <th scope="col">
                                    <AiOutlineClockCircle />
                                </th>
                                <th scope="col">&zwnj;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items.map((item: IPlayListItemProps, index: number) => (
                                <PlaylistItem key={index} {...item} />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        );
    }
}
