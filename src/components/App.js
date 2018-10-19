import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Main from "./Main";


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
