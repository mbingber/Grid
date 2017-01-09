import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ANONYMOUS } from '../constants';
import { signIn, listenForAuth, logout } from '../actions/auth';
import { fbAuth } from '../firebase'

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.listenForAuth();
  }

  handleNameFormSubmit(e) {
    e.preventDefault();
  }

  renderNameForm() {
    return (
      <form onSubmit={this.handleNameFormSubmit.bind(this)}>
        <h2>Choose a username:</h2>
        <input />
        <button type='submit'>Submit</button>
      </form>
    );
  }

  render() {
    return (
      <div>
        {this.props.auth.username ? this.props.children : this.renderNameForm()}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { listenForAuth, logout })(App);
