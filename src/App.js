import React, { Component } from 'react';
import deafboy from './deafBoyTransparent.png';
import './App.css';


import {verifyEmail} from "./VerifyEmail/VerifyEmail.js"


class App extends Component {
  constructor(props){
    super(props);
    this.state = {email: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    var emailVerified = verifyEmail(this.state.email);
    console.log(emailVerified)
    if(emailVerified){
      console.log('valid email', this.state.email)
    } else {
      console.log('invalid email', this.state.email)
    }

    e.preventDefault();
  }

  handleChange(e){
    this.setState({email: e.target.value})
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={deafboy} className="App-logo" alt="logo" />
          <h1 className="App-title">deafBoy -/+</h1>
        </header>
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"></input>
        </form>
        </div>
      </div>
    );
  }
}

export default App;
