/*Hello, my name is Tamara and I'm a master student at the university of applied science in upper austria - Hagenberg. I'm implementing a web quality analyzing tool to check websites based on their source code given by a url input. your project is very interesting and provides a very good validation on accessibility. Therefore, I would be very happy if I could have access to your API for free. My project will tell the audience that I use your API and the project will only run on my local computer and will not be published in the world wide web.
    I'm looking forward to your answer! Have a nice day,
Tamara*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import decodeHTML from 'decode-html';

import AccessibilityBar from './/Accessibility-Bar';


class Accessibility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      error: '',
      showHideError: 'checked',
      showHideInfo: 'checked',
      errorcount: 0,
      warningcount: 0,
      url: '',
    };

    this.validateAccessibility = this.validateAccessibility.bind(this);
    this.httpRequest = this.httpRequest.bind(this);
  }

  componentWillMount() {
    this.validateAccessibility(this.props.url);
  }

  componentDidUpdate() {
    if (this.state.url != this.props.url) {
      this.validateAccessibility(this.props.url);
    }
  }



  validateAccessibility(url) {
    const self = this;
    const querystring = require('querystring');

    const data = querystring.stringify({
      url: url,
      key: '311dd7a96bb12a81a31a22e5bfb8c79f',
      //key: '54e59553de302a9570b79c88b481ce46',

    });

    const options = {
      host: 'tenon.io',
      port: 443,
      path: '/api/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    this.httpRequest(options, data)
        .then(function (myData) {
          console.log('data test promise', JSON.parse(myData));
          self.setState({
            data: JSON.parse(myData),
            url: self.props.url,
          });
        });


  }

  httpRequest(params, postData) {

    const http = require('http');

    return new Promise(function (resolve, reject) {
      let req = http.request(params, function (res) {
        // reject on bad status
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode));
        }
        // cumulate data
        let myData = '';
        res.on('data', (chunk) => {
          myData += chunk;
        });
        // resolve on end
        res.on('end', function () {
          //console.log(JSON.parse(myData));
          resolve(myData);
        });
      });
      // reject on request error
      req.on('error', function (err) {
        // This is not a "Second reject", just a different sort of failure
        reject(err);
      });
      if (postData) {
        req.write(postData);
      }
      // IMPORTANT
      req.end();
    });
  }


  render() {

    let errorItems = [];
    let passed = '';
    let failed = '';

    //console.log('state test', this.state.data);

    if (this.state.data !== '') {
       passed = this.state.data.resultSummary.tests.passing;
       failed = this.state.data.resultSummary.tests.failing;

      const error = this.state.data.resultSet;
      let codeSnipped = '';

      //add warnings and errors
      for (let i = 0; i < error.length; i++) {

        codeSnipped = decodeHTML(error[i].errorSnippet);

        let classChecked = '';
        if (error[i].certainity === 100) {
          classChecked = this.state.showHideError;
        } else {
          classChecked = this.state.showHideInfo;
        }
        errorItems.push(

            <div className={'error col-md-12 ' + classChecked} key={i}>
              <div className="col-md-6">
                <span className="codeLine">In line: {error[i].position.line}</span>
                <p className="codeSnipped">{ codeSnipped}</p>
              </div>

              <div className="col-md-6">
                <span className={'errorType ' + error[i].certainity}><i className="fa"></i> {error[i].errorTitle}</span>
                <span className="priority">Priority: {error[i].priority}</span>
                <br/><span className="errorMessage">Description: {error[i].errorDescription}</span>
                <br/><span className="standardsMessage">Standard: {error[i].standards[0]}</span>
                <br/><span className="errorMessage">Solution: {error[i].resultTitle}</span>
              </div>
            </div>
        )
      }
    }

    if (errorItems !== '') {
      return (<div>
        <AccessibilityBar passed={passed} failed={failed}/>
        {errorItems}
      </div>);
    } else {
      return null;
    }
  }
}

const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(Accessibility);
