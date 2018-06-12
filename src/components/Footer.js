import React, {Component} from 'react';
import '../styles/App.css';

class Footer extends Component {
  render() {
    return (
        <div className='container'>
          <div>
            <p>This tool helps you to analyze the quality of a website by five different areas.
              The HTML & CSS source code is validated first. Performance, Accessibility and
              Technology aspects are also checked. The result is a quality ranking and a list
              of errors which can be prevented.
              <br/>
              This project is done for a master thesis at the University of applied science
              in Upper Austria - Hagenberg in 2018. </p>
          </div>
        </div>
    );
  }
}

export default Footer;
