import React, { Component } from "react";
import { withRouter } from 'react-router-dom';  

import { Container } from "react-bootstrap";

import Header from "../../components/header/Header";

import "./GeneralLayout.scss";

class GeneralLayout extends Component<any, any> {

    render() {
        return (
            <Container>
                <Header
                    onSwitchButtonClick={(checked: boolean) => {
                        if (checked) {
                            this.props.history.push('/speech-to-speech')
                        } else {
                            this.props.history.push('/text-to-speech')
                        }
                    }}
                />

                <main>
                    {this.props.children}
                </main>
            </Container>
        );
    }
}

export default withRouter(GeneralLayout)