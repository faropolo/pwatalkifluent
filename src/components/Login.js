import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {Redirect} from 'react-router-dom';

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
            console.log("facebook console");
            console.log(response);
            this.signup(response, 'facebook');
        }
        
        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.signup(response, 'google');
        }

        return (
            <div>
                 <FacebookLogin
                    appId="2161428220852549"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}/>
                    <br/><br/>

                <GoogleLogin
                    clientId="116625893862-fi7i045467ouc970a9dbh33dr0ep8c1g.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}/>

            </div>
        )
    }
}

export default Login;