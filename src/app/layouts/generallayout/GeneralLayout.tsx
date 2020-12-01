import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import "./GeneralLayout.scss";

export default class GeneralLayout extends Component<{}, {}> {
    render() {
        return (
            <Container fluid>
                <Navbar>
                    <Navbar.Brand href="/">
                        El<span className="yellow">ai</span>ne Voice
                    </Navbar.Brand>
                </Navbar>
                {this.props.children}
            </Container>
        );
    }
}