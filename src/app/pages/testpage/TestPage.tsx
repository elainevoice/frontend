import React, { Component } from "react";

import "./TestPage.scss";
import Axios from "axios";

export default class TestPage extends Component<{}, { value: string }> {
  counter: number;
    constructor(props: any) {
        super(props);
        this.counter = 0;
        this.state = {
          value: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event: any) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event: any) {
          Axios({
            url: 'http://localhost/api/taco',
            method: 'POST',
            responseType: 'blob',
            data: {
              text: this.state.value
            }
          }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Code for AUTO-DOWNLOADING with an anchor tag
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', 'somethin.wav');
            // document.body.appendChild(link);
            // link.click();

            // Basic proof of concept design 🤡 idk how to render with React sadlife
            const audioPlaylist = document.getElementById('audio-playlist');
            const audio = document.createElement('audio');
            audio.setAttribute('controls', 'controls');
            audio.setAttribute('src', url)

            if (audio) {
              const audioTitle = document.createElement('p')
              this.counter++;
              audioTitle.innerHTML = "Audio File #" + this.counter;
              audioPlaylist?.appendChild(audioTitle);
              audioPlaylist?.appendChild(audio);
            }
          });

        event.preventDefault();
      }

    render() {
        return (
          <div id="content-wrapper">
            <form onSubmit={this.handleSubmit}>
              <textarea className="taco-text" placeholder="Enter your message here..." value={this.state.value} onChange={this.handleChange} />
              <br></br>
              <input type="submit" value="Submit" />
            </form>
            <div id="audio-playlist">
              
            </div>
          </div>
        );
      }
}