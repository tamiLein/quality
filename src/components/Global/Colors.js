import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class Colors extends Component {

  constructor(props) {
    super(props);
    this.createColors = this.createColors.bind(this);
  }

  componentDidMount() {
    if(this.props.colorData !== '') {
      this.createColors();
    }

   }

  componentDidUpdate() {
    if(this.props.colorData  !== '') {
         this.createColors();
    }
  }

  createColors() {
    const svg = this.node;
    const nodeWidth = 60;

    /*d3.json('./json/colors-' + this.props.data + '.json', function (error, data) {
      console.log('read data');
      if (error) {
        console.log('error', error.currentTarget.responseText);
      }*/

    const type = this.props.data;

    const data = this.props.colorData[type];
          const node = d3.select(svg)
          .selectAll('.node')
          .data(data)
          .enter()
          .append('g')
          .attr('class', 'colorNode')
          .attr('width', nodeWidth + 10)
          .attr('height', nodeWidth)
          .attr('transform', function (d) {
            return "translate( " + (nodeWidth * (d.POS - 1) * 1.1) + ", 0)";
          });

      node.append('rect')
          .attr('width', nodeWidth)
          .attr('height', nodeWidth)
          .attr('x', 0)
          .attr('y', 0)
          .attr('name', function (d) {
            return d.COLOR;
          })
          .attr('fill', function (d) {
            return d.COLOR;
          });

      node.append("text")
          .attr('x', 0)
          .attr('y', 75)
          .text(function (d) {
            return d.COLOR;
          });

    //});

  }

  render() {
    return ( <div>
          <h5>Used Colors - {this.props.data}</h5>
          <svg ref={node => this.node = node}
               width={500} height={100}>
          </svg>
        </div>
    );
  }
}

const stateMap = (state) => {
  return {
    colorData: state.colorData
  };
};

export default connect(stateMap)(Colors);
