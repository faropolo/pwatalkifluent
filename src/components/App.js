import React, { Component } from 'react';
import logo from './logo.svg';
import { Container, Row, Col, Button } from 'reactstrap';
import Toggle from 'react-toggle';
import './App.css'


/**
 * Fluent
 */
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fluentIsOnline: false
    }
  }

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
                  <Toggle
                    id='fluent-online'
                    defaultChecked={this.state.fluentIsOnline}
                    onChange={this.handleCheeseChange} />
                </p>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md={{ size: 6, offset: 3 }} className="d-flex justify-content-end" >
                Tempo de espera
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
