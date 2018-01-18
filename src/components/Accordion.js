import React, {Component} from 'react';
import '../styles/App.css';

//########## Components ##############
import AccordionCardHTML from './AccordionCardHTML';
import AccordionCardCSS from './AccordionCardCSS';
import AccordionCardPerformance from './AccordionCardPerformance';
import AccordionCardAccessibility from './AccordionCardAccessibility';
import AccordionCardGlobal from './AccordionCardGlobal';


class Accordion extends Component {
  render() {
    return (
        <div className="container">
          <div className="panel-group" id="accordion">
            <AccordionCardHTML/>
            <AccordionCardCSS/>
            <AccordionCardPerformance/>
            <AccordionCardAccessibility/>
            <AccordionCardGlobal/>
          </div>
        </div>
    );
  }
}

export default Accordion;
