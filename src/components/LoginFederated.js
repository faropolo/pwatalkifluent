import React, { Component } from 'react'
import { withFederated } from 'aws-amplify-react';
import { Button, Fa } from 'mdbreact';
import { Container, Row, Col, CardBody, Card, CardTitle } from 'reactstrap';

const Buttons = (props) => (
    <div>
        <button class="btn btn-lg btn-google btn-block text-uppercase" onClick={props.googleSignIn}><i class="fab fa-google mr-2"></i> Logar com Google</button>
        <button class="btn btn-lg btn-facebook btn-block text-uppercase" onClick={props.facebookSignIn}><i class="fab fa-facebook-f mr-2"></i> Logar com Facebook</button>
    </div>

)

const Federated = withFederated(Buttons);

const federated = {
    google_client_id: '116625893862-fi7i045467ouc970a9dbh33dr0ep8c1g.apps.googleusercontent.com',
    facebook_app_id: '2161428220852549',
};

class LoginFederated extends Component {


    handleAuthStateChange(state) {
        console.log(state)
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col sm='9' md='7' lg='5' className='mx-auto' >
                        <Card>
                            <CardBody >
                                <CardTitle>Sign In</CardTitle>
                                <hr class="my-4" />
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