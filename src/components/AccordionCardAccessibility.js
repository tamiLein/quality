import React, {Component} from 'react';
import '../styles/App.css';


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
              Anim pariatur cliche reprehenderit
            </div>
          </div>
        </div>

    );
  }
}

export default AccordionCardAccessibility;
