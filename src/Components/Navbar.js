import React from 'react'
import Nav from 'react-bootstrap/Nav'
function Navbar() {
    return (
        <div>
            <Nav variant="tabs" className="justify-content-center" defaultActiveKey="/tts">
                <Nav.Item>
                    <Nav.Link href="/tts">Active</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/stt">Loooonger NavLink</Nav.Link>
                </Nav.Item>
            </Nav>
        </div >
    )
}

export default Navbar
