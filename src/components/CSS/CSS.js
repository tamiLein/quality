import React, {Component} from 'react';
import cssValiator from 'w3c-css';

class CSS extends Component {

  constructor(props){
    super(props);
    this.state = {
      url: 'https://www.google.at/',
    }
  }


  validateCss(url) {
    cssValiator.validate(url)
        .on('error', function (err) {
          // an error happened
          console.error(err);
        })
        .on('validation-error', function (data) {
          // validation error
          console.log(data);
        })
        .on('validation-warning', function (data) {
          // validation warning
          console.log(data);
        })
        .on('end', function () {
          // validation complete
        });
  }


  render() {
    this.validateCss(this.state.url);


    return null;
  }
}

export default CSS;
