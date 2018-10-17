import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Button } from 'reactstrap';
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div>
          <Container className="justify-content-center">
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
                <p>
                  <img src={logo} alt="logo" className="image-fluid logo" /> Talki
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <p>
                  Por enquanto, o horario para ligar e desligar o Botão e falar com os fluentes é de segunda a sexta das 8:00 as 17:00
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button outline block > Buscar Fluentes</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default App;
