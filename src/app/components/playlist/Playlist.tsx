import React, { Component } from 'react';

import './Playlist.scss';
import Axios from 'axios';
import { Container } from 'react-bootstrap';

export default class Playlist extends Component<any, any> {
    playing: boolean;

    constructor(props: any) {
        super(props);

        this.playing = false;
        this.state = {
            value: '',
        };
    }

    static addRow(url: string, savedText: string | undefined) {
        // Set savedText to the current date if the text is unknown
        savedText = savedText ?? new Date().toString();

        // Table row of a single generated audio file
        const audioRow = document.createElement('tr');

        // Basic proof of concept design 🤡 idk how to render with React sadlife
        const playlistTable: any = document.getElementById('playlist-table');
        const audioPlaylist = playlistTable.getElementsByTagName('tbody')[0];

        const audio = document.createElement('audio');
        audio.setAttribute('controls', 'controls');
        audio.setAttribute('src', url);
        audio.preload = 'metadata';
        audio.style.display = 'none';

        const playButtonTD = document.createElement('td');
        playButtonTD.classList.add('playButtonTD');

        const audioTitleTD = document.createElement('td');
        audioTitleTD.classList.add('audioTitleTD');

        const audioModelTD = document.createElement('td');
        audioModelTD.classList.add('playButtonTD');

        const audioVocoderTD = document.createElement('td');
        audioVocoderTD.classList.add('playButtonTD');

        const audioDurationTD = document.createElement('td');
        audioDurationTD.classList.add('playButtonTD');

        const durationTime = document.createElement('span');

        const modelName = document.createElement('span');
        modelName.innerHTML = 'Whistling';

        const vocoderName = document.createElement('span');
        vocoderName.innerHTML = 'GriffinLim';

        if (audio) {
            audioRow?.appendChild(audio);
            const span = document.createElement('span');
            span.className = 'fa fa-play-circle fa-lg';

            // List van spans bijhouden, welke zijn gedrukt == playing state
            span.onclick = () => {
                if (!audio.onplaying) {
                    audio.play();
                } else {
                    audio.pause();
                }
            };

            const title = document.createElement('span');
            title.innerText = savedText;

            // Check if there is a new line in the title text to prevent the table getting messed up with enters (new lines)
            var checkNewLine: boolean = false;

            for (let i = 0; i < savedText.length; i++) {
                if (savedText[i] === '\n') {
                    checkNewLine = true;

                    if (savedText.length >= 25) {
                        title.innerText = savedText.slice(0, 25).slice(0, i).slice(0, -3) + '...';
                        break;
                    }
                    title.innerText = savedText.slice(0, i) + '...';
                    break;
                }
            }

            // Add ... to the end of the title in case it is too long for the table row
            if (savedText.length >= 25 && checkNewLine == false) {
                var slicedText = savedText.slice(0, 25);
                var editedText = slicedText.slice(0, -3) + '...';

                title.innerText = editedText;
            }

            playButtonTD.appendChild(span);
            audioTitleTD.appendChild(title);
            audioModelTD.appendChild(modelName);
            audioVocoderTD.appendChild(vocoderName);
            audioDurationTD.appendChild(durationTime);

            audioRow.appendChild(playButtonTD);
            audioRow.appendChild(audioTitleTD);
            audioRow.appendChild(audioModelTD);
            audioRow.appendChild(audioVocoderTD);
            audioRow.appendChild(audioDurationTD);

            audio.onloadedmetadata = function () {
                durationTime.innerHTML = (Math.round(audio.duration * 100) / 100).toString() + 's';
            };

            audioPlaylist?.appendChild(audioRow);
        }
    }

    render() {
        return (
            <Container>
                <div id="audio-playlist">
                    <hr></hr>
                    <h3>Playlist</h3>
                    <table id="playlist-table">
                        <thead>
                            <tr>
                                <th style={{ maxWidth: 50, width: 50 }}>&zwnj;</th>
                                <th style={{ width: 400, maxWidth: 400 }}>Title</th>
                                <th style={{ width: '25%' }}>Model</th>
                                <th style={{ width: '25%' }}>Vocoder</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </Container>
        );
    }
}
