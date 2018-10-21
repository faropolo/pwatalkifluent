import React, { Component } from 'react';
import Amplify from 'aws-amplify';
import amplifyConfig from './auth/AmplifyConfig';

import { withRouter } from 'react-router-dom';
import Main from "./Main";

Amplify.configure(amplifyConfig);

/**
 * Fluent
 */
class App extends Component {

  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default withRouter(App);
