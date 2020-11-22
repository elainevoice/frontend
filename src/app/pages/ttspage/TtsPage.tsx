import React, { Component } from "react";

import "./TtsPage.scss";
import Axios from "axios";
import { Container } from "react-bootstrap";

export default class TestPage extends Component<{}, { value: string }> {
    playing: boolean;

    constructor(props: any) {
        super(props);

        this.playing = false;
        this.state = {
            value: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event: any) {
        var savedText = this.state.value;
        Axios({
            url: "http://localhost:8000/api/taco",
            method: "POST",
            responseType: "blob",
            data: {
                text: this.state.value,
            },
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Code for AUTO-DOWNLOADING with an anchor tag
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'somethin.wav');
            // document.body.appendChild(link);
            // link.click();

            // Table row of a single generated audio file
            const audioRow = document.createElement("tr");

            // Basic proof of concept design 🤡 idk how to render with React sadlife
            const audioPlaylist = document.getElementById("playlist-table").getElementsByTagName('tbody')[0];
            const audio = document.createElement("audio");
            audio.setAttribute("controls", "controls");
            audio.setAttribute("src", url);
            audio.preload = "metadata";
            audio.style.display = "none";

            const playButtonTD = document.createElement("td");
            playButtonTD.style.border = "1px solid lightgrey";
            playButtonTD.style.borderWidth = "1px 0";
            playButtonTD.style.padding = "4px 0";

            const audioTitleTD = document.createElement("td");
            audioTitleTD.style.border = "1px solid lightgrey";
            audioTitleTD.style.borderWidth = "1px 0";
            audioTitleTD.style.padding = "4px 0";
            audioTitleTD.style.width = "400px";
            audioTitleTD.style.maxWidth = "400px";

            const audioModelTD = document.createElement("td");
            audioModelTD.style.border = "1px solid lightgrey";
            audioModelTD.style.borderWidth = "1px 0";
            audioModelTD.style.padding = "4px 0";

            const audioDurationTD = document.createElement("td");
            audioDurationTD.style.border = "1px solid lightgrey";
            audioDurationTD.style.borderWidth = "1px 0";
            audioDurationTD.style.padding = "4px 0";

            const durationTime = document.createElement("span");

            const modelName = document.createElement("span");
            modelName.innerHTML = "GriffinLim";

            if (audio) {
                audioRow?.appendChild(audio);
                const span = document.createElement("span");
                span.className = "fa fa-play-circle fa-lg"

                // List van spans bijhouden, welke zijn gedrukt == playing state
                span.onclick = () => {
                    if (!this.playing && !audio.onplaying) {
                        audio.play();
                        this.playing = true;
                    } else {
                        audio.pause();
                        this.playing = false;
                    }
                };

                const title = document.createElement("span");
                title.innerText = savedText;

                // Check if there is a new line in the title text to prevent the table getting messed up with enters (new lines)
                var checkNewLine: boolean = false;

                for (let i = 0; i < savedText.length; i++) {
                    if (savedText[i] === '\n') {
                        checkNewLine = true;

                        if (savedText.length >= 25) {
                            title.innerText = savedText.slice(0, 25).slice(0, i).slice(0, -3) + "...";
                            break;
                        }
                        title.innerText = savedText.slice(0, i) + "...";
                        break;
                    }
                }

                // Add ... to the end of the title in case it is too long for the table row
                if (savedText.length >= 25 && checkNewLine == false) {
                    var slicedText = savedText.slice(0, 25);
                    var editedText = slicedText.slice(0, -3) + "...";

                    title.innerText = editedText;
                }

                playButtonTD.appendChild(span);
                audioTitleTD.appendChild(title);
                audioModelTD.appendChild(modelName);
                audioDurationTD.appendChild(durationTime);

                audioRow.appendChild(playButtonTD);
                audioRow.appendChild(audioTitleTD);
                audioRow.appendChild(audioModelTD);
                audioRow.appendChild(audioDurationTD);

                audio.onloadedmetadata = function () {
                    durationTime.innerHTML = (Math.round(audio.duration * 100) / 100).toString() + "s";
                };

                audioPlaylist?.appendChild(audioRow);
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <div id="content-wrapper">
                    <h2 className="tts-title">Text to Speech</h2>
                    <form onSubmit={this.handleSubmit}>
                        <textarea
                            className="taco-text"
                            placeholder="Fill in the text you want to have translated..."
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <div className="options-wrapper">
                            <select defaultValue="" name="models" id="models" className="select-btn">
                                <option value="" disabled>Select a model...</option>
                                <option value="flute">Flute</option>
                                <option value="xhosa" disabled>Xhosa</option>
                                <option value="human" disabled>Human</option>
                            </select>
                            <select defaultValue="" name="vocoders" id="vocoders" className="select-btn">
                                <option value="" disabled>Select a vocoder...</option>
                                <option value="griffinlim">GriffinLim</option>
                            </select>
                        </div>
                        <br></br>
                        <input className="translate-btn" type="submit" value="Translate" />
                    </form>
                    <div id="audio-playlist">
                        <hr></hr>
                        <h3>Playlist</h3>
                        <table id="playlist-table">
                            <thead>
                                <tr>
                                    <th style={{ maxWidth: 50, width: 50 }}>&zwnj;</th>
                                    <th style={{ width: 400, maxWidth: 400 }}>Title</th>
                                    <th style={{ "width": "25%" }}>Model</th>
                                    <th>Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>
        );
    }
}
