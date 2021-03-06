import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {  faUserCircle, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from './logo.svg';
import { Container, Row, Col, Button } from 'reactstrap';
import Toggle from 'react-toggle';
import Services from './services'
import { Auth } from 'aws-amplify';
import Call from './Call'

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
      user: null,
      callID: null,
      talkiName: null
    }
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser()
        .then(user => {
            this.setState({ user })
        })
        .catch(err => {
            this.setState({ user : null })
            this.props.history.push("/");
        })
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
  
  onCall(callID, talkiName) {
    this.setState({ callID, talkiName })
  }

  getItems() {
    Services.talki.calls.getWaitingTalki()
      .then(dados => {
        let talkiList = dados.map( item => {
            return (<Row key={item.UserID}>
                <Col sm='2' md='2' lg='2' className="">
                    <FontAwesomeIcon icon={faUserCircle} size="3x" />
                </Col>
                <Col sm='6' md='6' lg='6' className="">
                    <span>{item.TalkiName}</span>
                </Col>
                <Col sm='2' md='2' lg='2' className="">
                    <span>10:10</span>
                </Col>
                <Col sm='2' md='2' lg='2' className="">
                    <a href='z' onClick={(e)=> {e.preventDefault(); this.onCall(item.UserID, item.TalkiName)}} >
                      <FontAwesomeIcon icon={faPhone}  size="3x" transform="shrink-6" color="white" mask={['far', 'circle']} style={{background:"green"}}/>
                    </a>
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

    const {talkiName, callID, user} = this.state
    const callProps = { 
        talkiName,
        fluentName: user?user.name:'',
        channel: callID,
    }

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
            {this.state.callID && (
              <Row>
                <Col md={{ size: 4, offset: 4 }} className="text-center border" >
                    <Call {...callProps} />
                </Col>
              </Row>
             
            )}
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
