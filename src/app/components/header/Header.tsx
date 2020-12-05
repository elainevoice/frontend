import React, { Component } from 'react';

import { Navbar } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

import './Header.scss';

export interface IHeaderProps {
    onSwitchButtonClick: (checked: boolean) => void;
}

export default class Header extends Component<IHeaderProps, any> {
    render() {
        return (
            <Navbar variant="light" className="container">
                <Navbar.Brand href="/">
                    El<span className="text-primary">ai</span>ne Voice
                </Navbar.Brand>

                <Navbar.Collapse className="justify-content-end">
                    <BootstrapSwitchButton
                        checked={true}  // This is always true, so this won't really work well on other routes.
                        onlabel="Voice"
                        onstyle="primary"
                        offstyle="primary"
                        offlabel="Text"
                        width={100}
                        onChange={this.props.onSwitchButtonClick}
                    />
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
