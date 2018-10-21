import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import logo from './logo.svg';


class Login extends Component {

    constructor(props) {
        super(props);
           this.state = {
           loginError: false,
           redirect: false
        };
        this.signup = this.signup.bind(this);
    }

    signup(res, type) {

    }

    render() {
        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/home'}/>)
        }

        const responseFacebook = (response) => {
            this.signup(response, 'facebook');
        }
        
        const responseGoogle = (response) => {
            this.signup(response, 'google');
        }

        return (
            <div className="App">
                <Container fluid={true} className="justify-content-center">
                    <Row>
                        <Col md={{ size: 4, offset: 4 }} className="text-center sticky-top">
                            <div className='d-inline col-md-1'> <img src={logo} alt="logo" className="image-fluid logo" />  </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }} className="text-center">
                            <FacebookLogin
                                appId="2161428220852549" 
                                autoLoad={true}
                                fields="name,email,picture"
                                callback={responseFacebook}/>
                                <br/><br/>

                            <GoogleLogin
                                clientId="116625893862-fi7i045467ouc970a9dbh33dr0ep8c1g.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 4, offset: 4 }} className='bg-light text-center fixed-bottom pb-4'>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login;