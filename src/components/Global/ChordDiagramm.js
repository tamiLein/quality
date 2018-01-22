import React, {Component} from 'react';
// import * as d3 from 'd3';

class ChordDiagramm extends Component {

  constructor(props) {
    super(props);
    this.createChord = this.createChord.bind(this);
  }

  componentDidMount() {
    this.createChord();
  }

  componentDidUpdate() {
    this.createChord();
  }

  createChord() {


  }

  render() {
    return ( <div>
          <h5>Relations between HTML Elements:</h5>
          <h6>{this.props.data}</h6>
          <svg ref={node => this.node = node}
               width={500} height={100}>
          </svg>
        </div>
    );
  }
}

export default ChordDiagramm;
