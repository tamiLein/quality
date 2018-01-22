import React, {Component} from 'react';
import * as d3 from 'd3';

class Colors extends Component {

  constructor(props) {
    super(props);
    this.createBubbles = this.createBubbles.bind(this);
  }

  componentDidMount() {
    this.createBubbles();
  }

  componentDidUpdate() {
    this.createBubbles();
  }

  createBubbles() {
    const svg = this.node;
    const nodeWidth = 60;

    d3.json('./json/colors-' + this.props.data + '.json', function (error, data) {
      console.log('read data');
      if (error) {
        console.log('error', error.currentTarget.responseText);
      }

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

    });

  }

  render() {
    return ( <div>
          <h5>Colors</h5>
          <h6>{this.props.data}</h6>
          <svg ref={node => this.node = node}
               width={500} height={100}>
          </svg>
        </div>
    );
  }
}

export default Colors;
