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

  componentDidMount() {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      let result = this.validateCode(code);
      if (result) {
        this.setState({video: result, message: ''});
      }
    }
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
            placeholder="wtqj5r"
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
          <a className="btn btn-primary" href={this.state.video.url} role="button" download>Download It!</a>
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
          'xe3tph'
        ]
      },
      {
        "name": "Bump'N'Grind Workout",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/bump-n-grind-workout.mp4",
        "codes": [
          '29fb38'
        ]
      },
      {
        "name": "Final Stretch",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/final-stretch.mp4",
        "codes": [
          'tehv2u'
        ]
      },
      {
        "name": "Burlesque Basics",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/burlesque-basics.mp4",
        "codes": [
          '4frz7k'
        ]
      },
      {
        "name": "Fantabulous",
        "url": "https://s3-us-west-2.amazonaws.com/showgirltemple/fantabulous.mp4",
        "codes": [
          'atyjf2'
        ]
      }
    ];
  }
}

export default App;
