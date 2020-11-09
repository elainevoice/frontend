import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import Card from './components/Card';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container';

export class App extends Component<{}, {}> {
  render() {
    return (
      <div>
        <Container className='container-fluid' fluid >
          <Navbar/>
          <Card />
        </Container>
      </div>
    );
  }
}

export default App;
