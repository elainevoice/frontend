import React, { Component, useState } from 'react'

import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Loader from './Loaders';

const styles = {
    center: {
        marginLeft: "auto",
        marginRight: "auto",
        "align-self": "center"
    },
}

export default class TtsForm extends Component<{}, {}> {
    // readonly text = useState('');
    // readonly setText = useState('');
    // readonly lang = useState('');
    // readonly setLang = useState('');
    // readonly content = useState('');
    // readonly setContent = useState('');
    // readonly infoText = useState('Please fill in text');
    // readonly setInfoText = useState('Please fill in text');
    // readonly base_url = 'http://localhost:8000/crack_create_audio';

    public async onSubmit() {
        // return new Promise((resolve: any) => {
        //     if (this.text) {
        //         this.setInfoText(<Loader className={styles.center}></Loader>);
    
        //         resolve.preventDefault();

        //         let request = {
        //             loading: true,
        //             data: null,
        //             error: false,
        //         }
        //         console.log()
    
        //         axios.post(this.base_url + `?text=${this.text}`, {
        //                 responseType: 'blob',
    
        //                 headers: {
        //                     'Accept': '*/*',
        //                 }
        //             }).then((response: any) => {
        //                 request = {
        //                     loading: false,
        //                     data: response.data,
        //                     error: false,
        //                 }
        //             }).catch((error: any) => {
        //                 request = {
        //                     loading: false,
        //                     data: null,
        //                     error: true,
        //                 };
        //             });
    
        //         if (request.error) {
        //             this.setContent(<p>There is an error</p>)
        //         }

        //         if (request.data) {
        //             this.setInfoText("Success")
        //             this.setContent(<div styles={{ 'max-width': "1rem" }}><br /><audio controls preload='auto' src={request.data} type='audio/wav' /></div>)
        //         }
        //     }
        // });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="ttsForm.InputTextareas">
                        <Form.Label>Input</Form.Label>
                        <Form.Control as="textarea" rows={3} /*onChange={e => this.setText(e.target.value)}*/ />
                    </Form.Group>
                    <Form.Group controlId="ttsForm.SelectLanguage">
                        <Form.Control as="select" size="sm" /*onChange={e => this.setLang(e.target.value)}*/ >
                            <option>Dutch</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Text muted /*className={styles.center}*/>
                        {/* {this.infoText} */}
                    </Form.Text>
                    <br />
                    <Button variant="outline-dark" type="submit" /*border='dark'*/>Go somewhere</Button>
                </Form>


                {/* {this.content} */}
            </div>
        )
    }
}