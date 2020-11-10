import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';

import "./FormPage.scss";

import SineWave from "../../components/hero/SineWave";

export default class FormPage extends Component<{}, {}> {
    render() {
        return (
            <div className="body">
                {/* Test */}
                <div className="hero">
                    <SineWave/>
                </div>
                {/* ./Test */}

                <div className="audiobar">
                    <div className="middle">
                        <h1>
                            00:16
                        </h1>
                    </div>
                    {/* <div className="right">                        
                        <Button variant="dark">Play?</Button>
                    </div> */}
                </div>

                <Form>
                    <div className="group">
                        <div className="left">
                            <Form.Group>
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={3}/>
                            </Form.Group>
                        </div>
                        <div className="right">
                            <Button variant="outline-dark" type="submit">Mick</Button>
                            <Button variant="outline-dark" type="submit">A-Z</Button>
                        </div>
                    </div>

                    <Button variant="outline-dark" type="submit">Generate</Button>
                </Form>
            </div>
        );
    }
}
    