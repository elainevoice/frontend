import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Card from './Components/Card'
import Navbar from './Components/Navbar'
import './App.scss';
import Container from 'react-bootstrap/Container'



function App() {
  return (
    <div >
      <Container className='container-fluid' fluid >
        <Navbar className='Navbar' />
        <Card />
      </Container>
    </div >
  );
}

export default App;
