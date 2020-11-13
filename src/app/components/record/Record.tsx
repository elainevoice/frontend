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
    };

    downloadRecording() {
        let newBlob = new Blob(this.state.recordedBlob, { type: 'audio/wav' });
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
