import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "../App"
import Loader from './Loaders'
import { useState } from "react";
import axios from "axios";


const styles = {
    center: {
        marginLeft: "auto",
        marginRight: "auto",
        "align-self": "center"
    },


}
function TtsForm() {
    const [text, setText] = useState('')
    const [lang, setLang] = useState('')
    const [content, setContent] = useState('')
    const [infoText, setInfoText] = useState('Please fill in text')
    const base_url = 'http://localhost:8000/crack_create_audio'

    const onSubmit = async e => {
        if (text !== '') {
            setInfoText(<Loader className={styles.center}></Loader>)

            e.preventDefault()
            let request = {
                loading: true,
                data: null,
                error: false,
            }
            console.log()

            await axios
                .post(base_url + `?text=${text}`, {
                    responseType: 'blob',

                    headers: {
                        'Accept': '*/*',
                    }
                })
                .then(response => {

                    request = {
                        loading: false,
                        data: response.data,
                        error: false,
                    }

                    // var troep = new Blob([response.data], {
                    //     type: "audio/wav"
                    // })
                    // console.log('===================================')
                    // console.log(troep)

                    // console.log('===================================')
                    // const link = document.createElement('a');
                    // // link.href = window.URL.createObjectURL(troep);
                    // link.href = response.data
                    // link.download = "xd.wav"
                    // document.body.appendChild(link);
                    // link.click();
                    // setInfoText("Success")
                    // link.remove();
                })


                .catch(error => {
                    request = {
                        loading: false,
                        data: null,
                        error: true,
                    };
                })



            if (request.error) {
                setContent(<p>There is an error</p>)
            }
            if (request.data) {
                setInfoText("Success")
                setContent(<div styles={{ 'max-width': "1rem" }}><br /><audio controls preload='auto' src={request.data} type='audio/wav' /></div>)
            }
        }
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="ttsForm.InputTextareas">
                    <Form.Label>Input</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={e => setText(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="ttsForm.SelectLanguage">
                    <Form.Control as="select" size="sm" onChange={e => setLang(e.target.value)}>
                        <option>Dutch</option>
                    </Form.Control>
                </Form.Group>
                <Form.Text muted className={styles.center}>
                    {infoText}
                </Form.Text>
                <br />
                <Button variant="outline-dark" type="submit" border='dark'>Go somewhere</Button>
            </Form>


            { content}
        </div >
    )
}
export default TtsForm
