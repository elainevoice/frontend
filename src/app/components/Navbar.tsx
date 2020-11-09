import React, { Component } from "react";

import Nav from 'react-bootstrap/Nav'

export default class Navbar extends Component<{}, {}> {
    render() {
        return (
            <div className='Navbar'>
                <Nav variant="tabs" className="justify-content-center" defaultActiveKey="/tts">
                    <Nav.Item>
                        <Nav.Link href="/tts">Active</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/stt">Loooonger NavLink</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div >
        );
    }
}