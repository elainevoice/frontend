import React, { Component } from "react";

import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

import SineWave from "../../components/hero/SineWave";

import "./HomePage.scss";

export default class HomePage extends Component<{}, {}> {
    render() {
        return (
            <div className="body">
                <div className="hero">
                    <SineWave/>
                </div>
        
                <h1 className="title">
                    <span className="green">Generate</span> your own language
                </h1>
                
                <Link to="/form">
                    <Button variant="dark">Get Started</Button>
                </Link>
            </div>
        );
    }
}