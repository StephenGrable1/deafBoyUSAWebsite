import React, { Component } from 'react';
import deafboy from './deafBoyTransparent.png';
import './App.css';

import Recaptcha from 'react-recaptcha';

import emoji from 'emoji-dictionary';

import {verifyEmail} from "./VerifyEmail/VerifyEmail.js"


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      recaptchaApproved: false, 
      completed: false
  };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.callback = this.callback.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.expiredCallback = this.expiredCallback.bind(this);
  }
  componentDidMount(){
    console.log(emoji.unicode);
  }
  handleSubmit(e) {
    var emailVerified = verifyEmail(this.state.email);

    if(emailVerified){
      console.log('valid email', this.state.email)
      this.setState({completed:true})
    } else {
      console.log('invalid email', this.state.email)
    }
    e.preventDefault();
  }

  handleChange(e){
    this.setState({email: e.target.value})
    this.setState({isValidEmail: verifyEmail(e.target.value)})
  }

  callback = function () {
    console.log("recpatcha loaded");
  };
  
  verifyCallback = function (response) {
    console.log("recaptcha approved");
    this.setState({recaptchaApproved: true})
  };

  expiredCallback = () => {
    console.log(`Recaptcha expired`);
    this.setState({recaptchaApproved: false})
  };


  resetCaptcha = () => {
    console.log(`Recaptcha expired`);
    this.setState({recaptchaApproved: false})
  };

  render() {
    var emailValidationBar = () => {
      var isEmailValid = verifyEmail(this.state.email);
      var emailLength = this.state.email.length;
      var captchaComplete = this.state.recaptchaApproved;
      var formCompleted = this.state.completed;


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
          width: '60%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter keep-going" ></div>
        )
      } 

      if(isEmailValid && !captchaComplete){
        const barStyle = {
          width: '80%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter email-success"></div>
          
        )
      } 

      if(isEmailValid && captchaComplete && !formCompleted){
        const barStyle = {
          width: '95%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter email-success"></div>
          
        )
      } 

      if(isEmailValid && captchaComplete && formCompleted){
        const barStyle = {
          width: '100%'
        }
        return (
          <div style={barStyle} className="email-input-bar-outter email-success"></div>
          
        )
      } 
    }

    var emailValidationText = () => {
      var isEmailValid = verifyEmail(this.state.email);
      var emailLength = this.state.email.length;
      var captchaComplete = this.state.recaptchaApproved;
      var formCompleted = this.state.completed;

      if(!isEmailValid && (emailLength >= 0 && emailLength <= 0)){
        return (
          <h4>Enter your email below</h4>
        )
      }

      if(!isEmailValid && (emailLength >= 1)){
        return (
          <h4>Almost there! Keep going!</h4>
        )
      } 

      if(isEmailValid && !captchaComplete){
        return (
            <h4>Click below to prove you're not a robot.</h4>          
        )
      } 

      if(isEmailValid && captchaComplete && !formCompleted){
        return (
            <h4 className="smash">Now smash that button!! 💥</h4>        
        )
      } 

      if(formCompleted){
        return (
          <h4>Thanks for signing up! 💯</h4>
        )
      } 
    }

    var emailSubmitButton = () => {
      if (this.state.recaptchaApproved){
        return (
          <input type="submit" value="Submit" className="submit-email-bttn"></input>
        )
      } else {
        return (
          <div></div>
        )
      }
    }

    return (
      <div className="App">
        <div className="App-header">
          <img src={deafboy} className="App-logo" alt="logo" />
          <h1 className="App-title">deafBoyUSA</h1>
        </div>
        <div>
        
        <div className="email-signup-progress-bar">
          {emailValidationBar()}
        </div> 

        <form onSubmit={this.handleSubmit} className="email-form">
          <label className="email-input-label">{emailValidationText()}</label>
            <input type="text" value={this.state.email} onChange={this.handleChange} className="email-input"/>
            <div className="recaptcha-widget">
        <div>
            <Recaptcha
              sitekey="6LetL0IUAAAAADzd_yTMiJJh56eY6LQulKRhOD-p"
              render="explicit"
              verifyCallback={this.verifyCallback}
              onloadCallback={this.callback}
              expiredCallback={this.expiredCallback}
            />
          </div>
          {emailSubmitButton()}
        </div>
        </form>
      </div>
    </div>
    );
  }
}

export default App;