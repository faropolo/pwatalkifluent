import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { withFederated } from 'aws-amplify-react';
import { Auth, Hub } from 'aws-amplify';
import { Container, Row, Col, CardBody, Card, CardTitle } from 'reactstrap';
import './LoginFederated.css'

const Buttons = (props) => (
    <div>
        <button className="btn google-button socialButton" onClick={props.googleSignIn}>
            <span>
                <svg className="social-logo" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                    <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                    <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                    <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                    <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EA4335"></path>
                </svg>
            </span> 
            <span>Logar com Google</span>
        </button>
        <button className="btn facebook-button socialButton" onClick={props.facebookSignIn}>
            <span>
                <svg className="social-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" color="#ffffff">
                    <path fill="#ffffff" d="
                        M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
                        11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
                        11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
                        15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
                        11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path>
                </svg>
            </span>
            <span>Logar com Facebook</span>
        </button>
    </div>
)

const Federated = withFederated(Buttons);

const federated = {
    google_client_id: '116625893862-fi7i045467ouc970a9dbh33dr0ep8c1g.apps.googleusercontent.com',
    facebook_app_id: '2161428220852549',
};

class LoginFederated extends Component {

    constructor(props) {
        super(props)
        this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
        this.loadUser = this.loadUser.bind(this);
        
        Hub.listen('auth', this)

        this.state ={
            user: null
        }
    }

    componentWillMount() {
        this.loadUser()
    }

    onHubCapsule(capsule) {
        this.loadUser();
    }

    loadUser() {
        Auth.currentAuthenticatedUser()
            .then(user => this.setState({ user }))
            .catch(err => this.setState({ user : null }))
    }

    handleAuthStateChange(state, data) { 
        this.setState({ logged: true})
    }

    render() {
        return (
            <Container>
                { this.state.logged && <Redirect to='/home'/> }

                <Row>
                    <Col sm='9' md='7' lg='5' className='mx-auto' >
                        <Card>
                            <CardBody >
                                <CardTitle>Sign In</CardTitle>
                                <hr className="my-4" />
                                <Federated federated={federated} onStateChange={this.handleAuthStateChange} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginFederated