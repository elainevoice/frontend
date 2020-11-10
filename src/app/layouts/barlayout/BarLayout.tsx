import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import GeneralLayout from "../generallayout/GeneralLayout";
import "./BarLayout.scss";

export default class BarLayout extends Component<{}, {}> {
    render() {
        return (
            <Container fluid>
                <Navbar fixed="top">
                    <Navbar.Brand href="/">
                        El<span className="yellow">ai</span>ne Voice
                    </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Nav.Link href="/form/generate">Generate</Nav.Link>
                            <Nav.Link href="/form/generated-audio">Generated Audio</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </Container>
        );
    }
}