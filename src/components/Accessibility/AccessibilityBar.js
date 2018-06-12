import React, {Component} from 'react';
import {connect} from 'react-redux';

class Accessibility extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    if (this.props.passed !== '') {
      const docWidth = 992 - 50;
      const passedWidthPercent = this.props.passed * 100 / 74;
      const failedWidthPercent = this.props.failed * 100 / 74;

      const passedStyle = {
        width: passedWidthPercent * docWidth / 100,
        background: '#fbc98d',
      };

      const failedStyle = {
        width: failedWidthPercent * docWidth / 100,
        background: '#9f2f7f',
      };

      let bar = [];
      bar.push(<div id='passed' style={passedStyle} key='passed'>{this.props.passed}</div>);
      bar.push(<div id='failed' style={failedStyle} key='failed'>{this.props.failed}</div>);

      return (
          <div id='access-bar'>
            <h5>Failed vs. Passed</h5>
            <p>The tenon.io API test 74 different error-cases.</p>
            <i className='section-pareto' id='sectionD'></i>
            <p>
              This section shows the passed amount of tests.
            </p>
            <i className='section-pareto' id='sectionA'></i>
            <p>
              This section shows the failed amount of tests.
            </p>
            {bar}
          </div>
      )
    } else {
      return null;
    }

  }
}


export default Accessibility;
