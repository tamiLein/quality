/*Hello, my name is Tamara and I'm a master student at the university of applied science in upper austria - Hagenberg. I'm implementing a web quality analyzing tool to check websites based on their source code given by a url input. your project is very interesting and provides a very good validation on accessibility. Therefore, I would be very happy if I could have access to your API for free. My project will tell the audience that I use your API and the project will only run on my local computer and will not be published in the world wide web.
    I'm looking forward to your answer! Have a nice day,
Tamara*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import decodeHTML from 'decode-html';

class Accessibility extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };


  }

  componentWillMount() {

  }

  componentDidUpdate() {
    if (this.state.url != this.props.url) {

    }
  }

  generateBar(){


  }



  render() {
    if(document.getElementById('collapse4')) {
      const docWidth = document.getElementById('collapse4').offsetWidth - 40;
      const passedWidthPercent = this.props.passed * 100 / 74;
      const failedWidthPercent = this.props.failed * 100 / 74;

      const passedStyle = {
        width: passedWidthPercent * docWidth / 100,
        background: '#fbc98d',
        //marginLeft: '20px'
      };

      const failedStyle = {
        width: failedWidthPercent * docWidth / 100,
        background: '#9f2f7f',
        //marginRight: '20px'
      };

      let bar = [];
      bar.push(<div id="passed" style={passedStyle}>{this.props.passed}</div>);
      bar.push(<div id="failed" style={failedStyle}>{this.props.failed}</div>);

      return(
          <div>
            {bar}
          </div>
      )
    }else{
      return null;
    }


  }
}

const stateMap = (state) => {
  return {
    url: state.url,

  };
};

export default connect(stateMap)(Accessibility);
