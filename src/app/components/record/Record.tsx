import React from 'react';

import './Record.scss';

// export interface IRecordProps {
//     onRecordedCallback: () => void
// }

// export interface IRecordState {
//     record?: boolean;
// }

export class Record extends React.Component<any, any> {
    // constructor(props: any) {
    //     super(props);
        
    //     this.setState({
    //         record: false,
    //     });
    // }

    // startRecording = () => {
    //     this.setState({
    //         record: true,
    //     });
    // };

    // stopRecording = () => {
    //     this.setState({
    //         record: false,
    //     });
    // };

    // onStop = (recordedBlob: { blobURL: any }) => {
    //     this.setState({
    //         blobURL: recordedBlob.blobURL,
    //         recordedBlob: recordedBlob,
    //     });

    //     this.onSpeak();
    // };

    // handleSubmit = (fd: FormData) => {
    //     SpeechProvider.requestSpeechByAudio(fd).subscribe(
    //         (result: any) => {
    //             const url = window.URL.createObjectURL(new Blob([result]));
    //             this.props.onRecordedCallback(url);
    //         }
    //     )
    // };

    // onSpeak = () => {
    //     const fd = new FormData();
    //     fd.append('file', this.state.recordedBlob.blob);
    //     this.handleSubmit(fd);
    // };

    // onFileChange = (event: any) => {
    //     const fd = new FormData();
    //     fd.append('file', event.target.files[0]);
    //     this.handleSubmit(fd);
    // };

    // recordButton = () => {
    //     if (this.state.record) {
    //         return (
    //             <Button onClick={this.stopRecording} variant="custom">
    //                 Stop recording
    //             </Button>
    //         );
    //     } else {
    //         return (
    //             <Button onClick={this.startRecording} variant="custom">
    //                 Start recording
    //             </Button>
    //         );
    //     }
    // };

    // render() {
    //     return (
    //         <Container>
    //         </Container>
    //     );
    // }
}
