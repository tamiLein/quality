import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';
import colorJs from 'color-js';


class Colors extends Component {

  constructor(props) {
    super(props);
    this.createColors = this.createColors.bind(this);
  }

  componentDidMount() {
    if (this.props.colorData !== '') {
      this.createColors();
    }

  }

  componentDidUpdate() {
    if (this.props.colorData !== '') {
      this.createColors();
    }
  }

  createColors() {

    const nodeWidth = 50;

    const type = this.props.data;

    const data = this.props.colorData[type];
    const dataColor = this.props.colorData[type];

    // sort by amount
    data.sort((a, b) => {
      return d3.ascending(a.count, b.count);
    });

    //sort by color
    dataColor.sort((a, b) => {
      let colorA = colorJs(a.COLOR).getHue();
      let colorB = colorJs(b.COLOR).getHue();

      return colorA - colorB;
    });

    let count = 0;

    document.getElementById(type) ? document.getElementById(type).remove() : '';


    const svg = d3.select('#colors'+type)
        .append('svg')
        .attr('id', type)
        .style('padding', '25px')
        .attr('class', 'col-md-12')
        .attr('height', Math.ceil(dataColor.length / 18) * 80 + 80);

    const node = svg.selectAll('.node')
        .data(dataColor)
        .enter()
        .append('g')
        .attr('class', 'colorNode')
        .attr('width', nodeWidth + 10)
        .attr('height', nodeWidth)
        .attr('transform', function (d) {
          count++;
          return "translate( " + (nodeWidth * ((count - 1) - Math.floor(count / 18) * 18)) + ", " + Math.floor(count / 18) * 75 + ")";
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

    node.append('text')
        .attr('x', 25)
        .attr('y', 33)
        .attr('text-anchor', 'middle')
        .style('opacity', 0.7)
        .style('font-size', '16px')
        .style('fill', 'white')
        .text(function (d) {
          return d.count;
        });

    node.append("text")
        .attr('x', 0)
        .attr('y', 62)
        .text(function (d) {
          return d.COLOR;
        });


    //});

  }

  render() {
    return ( <div>
          <h5>Used Colors - {this.props.data}</h5>
          <div id={"colors" + this.props.data}></div>
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
