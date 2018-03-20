import React, {Component} from 'react';
import '../styles/App.css';

import Accessibility from './Accessibility/Accessibility';


class AccordionCardAccessibility extends Component {
  render() {
    return (
        <div className="panel panel-default" id="panel-accessibility">
          <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse4"
             aria-expanded="false">

            <div className="panel-heading">
              <span className="colorbar"></span>
              <h4 className="panel-title">

                ACCESSIBILITY

              </h4>
              <i className="fa arrow" aria-hidden="true"></i>
            </div>
          </a>
          <div id="collapse4" className="panel-collapse collapse">
            <div className="panel-body">
              Coming soon... Testing the accessibility of the page.
              <Accessibility/>
            </div>
          </div>
        </div>

    );
  }
}

export default AccordionCardAccessibility;
