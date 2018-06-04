import React, {Component} from 'react';
import {connect} from 'react-redux';

class Accessibility extends Component {
  constructor(props) {
    super(props);
    this.state = {};


  }

  componentWillMount() {

  }

  componentDidUpdate() {
    if (this.state.url !== this.props.url) {

    }
  }

  generateBar() {


  }


  render() {
    if (document.getElementById('collapse4')) {
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

      return (
          <div>
            {bar}
          </div>
      )
    } else {
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
