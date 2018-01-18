import React, {Component} from 'react';
import '../styles/App.css';

import CSS from './CSS/CSS';


class AccordionCardCSS extends Component {
  render() {
    return (
        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse2" aria-expanded="false">
          <div className="panel panel-default" id="panel-css">
            <div className="panel-heading">
              <span className="colorbar"></span>
              <h4 className="panel-title">

                CSS VALIDATION

              </h4>
              <i className="fa arrow" aria-hidden="true"></i>
            </div>
            <div id="collapse2" className="panel-collapse collapse">
              <div className="panel-body">
                Anim pariatur cliche reprehenderit
                <CSS/>
              </div>
            </div>
          </div>
        </a>
    );
  }
}

export default AccordionCardCSS;
