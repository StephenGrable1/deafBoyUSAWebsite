import React, { Component } from 'react';
import deafboy from './deafBoyTransparent.png';
import './App.css';


import {verifyEmail} from "./VerifyEmail/VerifyEmail.js"


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '', 
      isValidEmail: false
  };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    var emailVerified = verifyEmail(this.state.email);
    
    if(emailVerified){
      console.log('valid email', this.state.email)
    } else {
      console.log('invalid email', this.state.email)
    }

    e.preventDefault();
  }

  handleChange(e){
    this.setState({email: e.target.value})
    this.setState({isValidEmail: verifyEmail(e.target.value)})
  }

  render() {
    var emailValidationBar = () => {
      var isEmailValid = this.state.isValidEmail;
      var emailLength = this.state.email.length;


      if(isEmailValid){
        const barStyle = {
          width: '100%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter email-success"></div>
          
        )
      } 

      
      if(!isEmailValid && (emailLength >= 0 && emailLength <= 0)){
        const barStyle = {
          width: '30%'
        }
        return (
          <div style={barStyle}  className="email-input-bar-outter get-started"></div>
        )
      }


      if(!isEmailValid && (emailLength >= 1)){
        const barStyle = {
          width: '70%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter keep-going" ></div>
        )
      } 
      
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={deafboy} className="App-logo" alt="logo" />
          <h1 className="App-title">deafBoyUSA</h1>
        </header>
        <div>
        <form onSubmit={this.handleSubmit}>
          <label>Email
            <input type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit"></input>
        </form>

        <div className="email-signup-progress-bar">
          {emailValidationBar()}
        </div>  
        <h4>Progress</h4>
        </div>
      </div>
    );
  }
}

export default App;
