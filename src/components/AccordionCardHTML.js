import React, {Component} from 'react';
import '../styles/App.css';

import HTML from './HTML/HTML';


class AccordionCardHTML extends Component {
  render() {
    return (
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false">
        <div className="panel panel-default" id="panel-html">
          <div className="panel-heading">
            <span className="colorbar"></span>
            <h4 className="panel-title">
                HTML STRUCTURE
            </h4>
            <i className="fa arrow" aria-hidden="true"></i>
          </div>
          <div id="collapseOne" className="panel-collapse collapse">
            <div className="panel-body">
              Anim pariatur cliche reprehenderit
              <HTML/>
            </div>
          </div>
        </div>
        </a>
    );
  }
}

export default AccordionCardHTML;
