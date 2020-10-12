import React from 'react'
import Card from 'react-bootstrap/Card'
import '../index.css'
import TtsForm from './TtsForm'
function ActualCard() {
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
    )
}

export default ActualCard
