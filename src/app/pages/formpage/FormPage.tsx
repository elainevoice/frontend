import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';

import './FormPage.scss';

import SineWave from '../../components/hero/SineWave';
import { Record } from '../../components/record/Record';

export default class FormPage extends Component<{}, {}> {
    render() {
        return (
            <div className="body">
                <Row>
                    <Record />
                </Row>

                {/* Test 
                <div className="hero">
                    <SineWave/>
                </div>
                 ./Test */}
                {/*<Row className="justify-content-md-center">
                    <Button variant="link">
                        <BsFillPlayFill/>
                    </Button>
                    <h1>00:16</h1>
        </Row>*/}
                {/*<Form>
                    <Row className="justify-content-md-center">
                        <Col md="6">
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Label>Input</Form.Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="10">
                                        <Form.Control as="textarea" rows={3}/>
                                        <Button className="mt-2 float-right" variant="outline-secondary" type="submit">Generate</Button>
                                    </Col>
                                    <Col md="2">
                                        <Row>
                                            <Button variant="link">
                                                <BiMicrophone/>
                                            </Button>
                                        </Row>
                                        <Row>
                                            <Button variant="link">
                                                a-Z
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>*/}
            </div>
        );
    }
}
