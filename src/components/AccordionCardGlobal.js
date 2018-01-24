import React, {Component} from 'react';
import '../styles/App.css';

//########## Components ##############
import Bubbles from './Global/Bubbles';
import Classnames from './Global/Classnames';
import Colors from './Global/Colors';
import ChordDiagramm from './Global/ChordDiagramm';
import ParseHtml from './Global/ParseHTML';


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
              <div className="row">
                <div id="bubbleChart" className="col-md-6">
                  <Bubbles/>

                </div>
                <div id="classnames" className="col-md-6">
                  <h5>Classnames</h5>
                  <p>The following classnames are used in the given source code:</p>
                  <ul>
                    <Classnames/>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div id="colorChart" className="col-md-6">
                  <Colors data="font"/>
                  <Colors data="background"/>
                  <Colors data="border"/>

                </div>
              </div>
              <div className="row">
                <div id="chordChart" className="col-md-6">
                  <ChordDiagramm/>
                  {/*<ParseHtml/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

    );
  }
}

export default AccordionCardGlobal;
