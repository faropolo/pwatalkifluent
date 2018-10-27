import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import { Container, Row, Col, Button } from 'reactstrap';
import Toggle from 'react-toggle';
import Services from './services'
import { Auth, Cache } from 'aws-amplify';

import './Home.css'


/**
 * Fluent
 */
class Home extends Component {

  constructor(props) {
    super(props)
    
    this.handleAuthStateChange = this.handleAuthStateChange.bind(this);

    this.state = {
      fluentIsOnline: false,
      talkiList: [],
      user: null
    }
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser()
        .then(user => {
            this.setState({ user })

            Cache.getItem('federatedInfo').then(federatedInfo => {
                const { token } = federatedInfo;
                console.log(federatedInfo, '<=== Federated Info')
            });
        })
        .catch(err => this.setState({ user : null }))
  } 

  handleFluentOnline(event) {
    if (event.target.checked) {
      this.timer = setInterval(()=> this.getItems(), 2000);
    } else {
      clearInterval(this.timer)
      this.timer = null
      this.setState({ talkiList : [] })
    }
  }

  getItems() {
    Services.getWaitingTalki()
      .then(dados => {
        let talkiList = dados.map( item => {
            return (<Row>
                <Col md={{ size: 4, offset: 4 }} className="text-center border">
                    <img src={item.picture} className="rounded-circle" alt="Cinque Terre" />
                    <span>Fulano da Silva</span>
                    <span>10:10</span>
                </Col>
            </Row>)
        })

        this.setState({ talkiList })

      })
      .catch( error => {
        console.log(error, '<== Error')
      })
  }

  signOut() {
    Auth.signOut()
    this.props.history.push("/");
  }

  handleAuthStateChange(state, data) { 
    this.setState({ logged: true})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div>
          <Container fluid={true} className="justify-content-center">
            <Row>
              <Col md={{ size: 4, offset: 4 }} className="text-center sticky-top">
                  <div className='d-inline col-md-1 '> <Button onClick={() => this.signOut() }> Sair </Button> </div>
                  <div className='d-inline col-md-1'> <img src={logo} alt="logo" className="image-fluid logo" />  </div>
                  <div className='d-inline col-md-1'> Talki </div>
                  <div className='d-inline col-md-1'>
                      <Toggle
                        id='fluent-online'
                        defaultChecked={this.state.fluentIsOnline}
                        onChange={ event => this.handleFluentOnline(event)} />
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
                {this.state.talkiList 
                  ? this.state.talkiList
                  : "Fila Vazia"}
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 4, offset: 4 }} className='bg-light text-center fixed-bottom pb-4'>
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
