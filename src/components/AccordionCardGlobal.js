import React, {Component} from 'react';
import '../styles/App.css';

//########## Components ##############
import Bubbles from './Bubbles';


class AccordionCardGlobal extends Component {
  render() {
    return (

        <div className="panel panel-default" id="panel-global">
          <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse5"
             aria-expanded="false">
            <div className="panel-heading">
              <span className="colorbar"></span>
              <h4 className="panel-title">

                GLOBAL INFORMATION

              </h4>
              <i className="fa arrow" aria-hidden="true"></i>
            </div>
          </a>
          <div id="collapse5" className="panel-collapse collapse">
            <div className="panel-body">
              <div id="bubbleChart">
                <svg id="svg-bubbles" width="400" height="400" textAnchor="middle"></svg>
                {/*<Bubbles/>*/}
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default AccordionCardGlobal;
