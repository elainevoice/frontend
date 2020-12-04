import React, { Component } from "react";

import { Container, Navbar } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import "./GeneralLayout.scss";

export default class GeneralLayout extends Component<any, any> {

    render() {
        return (
            <Container fluid>
                <Navbar>
                    <Navbar.Brand href="/">
                        El<span className="yellow">ai</span>ne Voice
                    </Navbar.Brand>
                </Navbar>

                <main>
                    <Container className="mt-3">
                        <div className="d-flex justify-content-end mb-3">
                            <BootstrapSwitchButton
                                checked={true}
                                onlabel="Voice"
                                onstyle="warning"
                                offstyle="warning"
                                offlabel="Text"
                                width={100}
                                onChange={console.log("FUCK");}
                            />
                        </div>
                    </Container>

                    {this.props.children}
                </main>
            </Container>
        );
    }
}