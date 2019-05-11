import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      message: '',
      video: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({code: event.target.value});
  }

  handleSubmit(event) {
    let result = this.validateCode(this.state.code);
    if (!result) {
      this.setState({video: '', message: 'Code not found, please enter again.'});
    } else {
      this.setState({video: result, message: ''});
      console.log('Video found', result);
    }
    event.preventDefault();
  }

  render() {
    let view;
    if (this.state.video) {
      view = this.downloadVideo();
    } else {
      view = this.downloadForm();
    }

    let alertMessage;
    if (this.state.message) {
      alertMessage = (
        <div className="App-alert alert alert-danger" role="alert">
          <b>Glitter Explosion!</b> {this.state.message}
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            BODY MAGICK BURLESQUE
          </p>
          {view}
          {alertMessage}
        </header>
      </div>
    );
  }

  downloadForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input
            type="code"
            className="form-control"
            id="code"
            aria-describedby="Enter your download code"
            placeholder="ee1203ab-ae68-4e91-8ad2-032a2111ad6e"
            value={this.state.code}
            onChange={this.handleChange}
            />
          <small id="codeHelp" className="form-text text-muted">Enter your download code to retrieve your video.</small>
        </div>
        <button type="submit" className="btn btn-primary">Continue</button>
      </form>
    )
  }

  validateCode(code) {
    let videos = this.getVideos();
    return _.find(videos, { codes: [ code ]});
  }

  downloadVideo() {
    return (
      <div>
        <label>
          Video: {this.state.video.name}
        </label>
        <div>
          <a class="btn btn-primary" href={this.state.video.url} role="button" download>Download It!</a>
        </div>
      </div>
    );
  }

  getVideos() {
    return [
      {
        "name": "Warm Up",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/warmup.mp4",
        "codes": [
          'f4b8db70-5b17-4ab7-b402-760cc08cc324'
        ]
      },
      {
        "name": "Bump'N'Grind Workout",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/bump-n-grind-workout.mp4",
        "codes": [
          'ee1203ab-ae68-4e91-8ad2-032a2111ad6e'
        ]
      },
      {
        "name": "Final Stretch",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/final-stretch.mp4",
        "codes": [
          '819d199a-b639-4544-b281-a3c7474b7bcd'
        ]
      },
      {
        "name": "Burlesque Basics",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/burlesque-basics.mp4",
        "codes": [
          '41785f8d-dd93-45c8-bf28-6725ceffb4db'
        ]
      },
      {
        "name": "Fantabulous",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/fantabulous.mp4",
        "codes": [
          '1d9a416d-6b0e-45f5-9f45-48a1e364edc1'
        ]
      }
    ];
  }
}

export default App;
