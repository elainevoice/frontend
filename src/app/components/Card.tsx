import React, { Component } from 'react'

import '../../index.scss'

import Card from 'react-bootstrap/Card'

import TtsForm from './TtsForm'

export default class ActualCard extends Component<{}, {}> {
    render() {
        return (
            <div className="Cards" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            }} >
                <Card className="text-center" style={{
                    width: "70vw",
                    margin: "1em"
                }} bg='white' border='warning'>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>Text to speech</Card.Title>
                        <TtsForm></TtsForm>
                    </Card.Body>
                </Card>
            </div >
        );
    }
}