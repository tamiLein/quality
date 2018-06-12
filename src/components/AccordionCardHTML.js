import React, {Component} from 'react';
import '../styles/App.css';

import HTML from './HTML/HTML';


class AccordionCardHTML extends Component {
  render() {
    return (

        <div className='panel panel-default' id='panel-html'>
          <a className='collapsed' data-toggle='collapse' data-parent='#accordion' href='#collapseOne'
             aria-expanded='false'>
            <div className='panel-heading'>
              <span className='colorbar'></span>
              <h4 className='panel-title'>
                HTML STRUCTURE
              </h4>
              <i className='fa arrow' aria-hidden='true'></i>
            </div>
          </a>
          <div id='collapseOne' className='panel-collapse collapse'>
            <div className='panel-body'>
              <HTML/>
            </div>
          </div>

        </div>

    );
  }
}

export default AccordionCardHTML;
