import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import { Container, Row, Col } from 'reactstrap';
import Toggle from 'react-toggle';
import './Home.css'


/**
 * Fluent
 */
class Home extends Component {

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
          <Container fluid={true} className="justify-content-center">
            <Row>
              <Col md={{ size: 4, offset: 4 }} className="text-center sticky-top">
                  <div className='d-inline col-md-1'> </div>
                  <div className='d-inline col-md-1'> <img src={logo} alt="logo" className="image-fluid logo" />  </div>
                  <div className='d-inline col-md-1'> Talki </div>
                  <div className='d-inline col-md-1'>
                      <Toggle
                        id='fluent-online'
                        defaultChecked={this.state.fluentIsOnline}
                        onChange={this.handleCheeseChange} />
                  </div>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 4 }} className="d-flex justify-content-end" >
                  Tempo de espera
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 4 }} className="text-center border" >
                Fila Vazia
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 4 }} className='bg-light text-center fixed-bottom'>
                  <div className='d-inline col-md-1'> <Link to='/home' className='text-dark'>Home</Link> </div>
                  <div className='d-inline col-md-1'> <Link to='/ganhos' className='text-dark'>Ganhos</Link> </div>
                  <div className='d-inline col-md-1'> <Link to='/avaliacoes' className='text-dark'>Avaliaçoes</Link> </div>
                  <div className='d-inline col-md-1'> <Link to='/conta' className='text-dark'>Conta</Link> </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
