import React, {Component} from 'react';
import htmlValiator from 'html-validator';

class HTML extends Component {
  constructor(props){
    super(props);
    this.state = {
      url: 'https://www.google.at/',
    }
  }

  validateHTML(url){
    const options = {
      url: url,
      format: 'text'
    };

    htmlValiator(options)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error)
        });
  }

  render() {
    this.validateHTML(this.state.url);


    return null;
  }
}

export default HTML;
