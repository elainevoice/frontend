import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { BiMicrophone, BiMicrophoneOff } from "react-icons/bi";

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

                <Row className="justify-content-md-center">
                    <Button variant="link">
                        <BsFillPlayFill/>
                    </Button>
                    <h1>00:16</h1>
                </Row>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Input</Form.Label>
                                <Form.Control as="textarea" rows={3}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Button variant="link">
                                <BiMicrophone/>
                            </Button>
                            <Button variant="link">
                                a-Z
                            </Button>
                        </Col>
                    </Row>

                    <Button variant="outline-dark" type="submit">Generate</Button>
                </Form>
            </div>
        );
    }
}
    