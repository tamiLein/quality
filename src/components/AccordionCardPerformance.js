import React, {Component} from 'react';
import '../styles/App.css';

//import Pagespeed from './Pagespeed/Pagespeed';


class AccordionCardPerformance extends Component {
  render() {
    return (
        <div className="panel panel-default" id="panel-performance">
          <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse3"
             aria-expanded="false">

            <div className="panel-heading">
              <span className="colorbar"></span>
              <h4 className="panel-title">

                PERFORMANCE

              </h4>
              <i className="fa arrow" aria-hidden="true"></i>
            </div>
          </a>
          <div id="collapse3" className="panel-collapse collapse">
            <div className="panel-body">
              Anim pariatur cliche reprehenderit
              {/*<Pagespeed/>*/}
            </div>
          </div>
        </div>

    );
  }
}

export default AccordionCardPerformance;
