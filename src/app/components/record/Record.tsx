import Axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { ReactMic } from 'react-mic';

export class Record extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            record: false,
        };
    }

    startRecording = () => {
        this.setState({
            record: true,
        });
    };

    stopRecording = () => {
        this.setState({
            record: false,
        });
    };

    onStop = (recordedBlob: { blobURL: any }) => {
        const self = this;
        console.log(recordedBlob);
        self.setState({
            blobURL: recordedBlob.blobURL,
            recordedBlob: recordedBlob,
        });

        this.handleSubmit();
    };

    downloadRecording() {
        let newBlob = new Blob(this.state.recordedBlob, { type: 'audio/wav' });
    }

    async handleSubmit() {
        const fd = new FormData();
        fd.append('file', this.state.recordedBlob.blob);
        let response = await fetch(this.state.recordedBlob.blobUrl);
        let blob = await response.blob();
        const file = new File([blob], 'audio.wav', {
            type: 'audio/wav',
        });

        Axios({
            url: 'http://localhost:8000/taco_audio',
            method: 'POST',
            responseType: 'blob',
            headers: { 'content-type': 'multipart/form-data' },
            data: fd,
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
            audio.setAttribute('src', url);

            if (audio) {
                const audioTitle = document.createElement('p');
                audioTitle.innerHTML = 'Audio File';
                audioPlaylist?.appendChild(audioTitle);
                audioPlaylist?.appendChild(audio);
            }
        });
    }

    onData() {
        console.log('recording');
    }

    render() {
        return (
            <div className="body">
                <div>
                    <Button onClick={this.startRecording} variant="primary">
                        Start
                    </Button>
                    <Button onClick={this.stopRecording} variant="primary">
                        Stop
                    </Button>
                </div>
                <div className="record">
                    <ReactMic
                        record={this.state.record}
                        className="sound-wave"
                        onStop={this.onStop}
                        onData={this.onData}
                        strokeColor="#111"
                        mimeType="audio/wav"
                        backgroundColor="#fcfcfc"
                    />
                </div>
            </div>
        );
    }
}
