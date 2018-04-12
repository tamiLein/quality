import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class Bubbles extends Component {

  constructor(props) {
    super(props);
    this.createBubbles = this.createBubbles.bind(this);
  }

  componentDidMount() {
    if(this.props.classNames !== "empty") {
      this.createBubbles();
    }
  }

  componentDidUpdate() {
    if(this.props.classNames !== "empty") {
      this.createBubbles();
    }
  }

  createBubbles() {
    const svg = this.node;
    const width = 500;
    const height = 500;

    const data = this.props.classNames;


    const colors = [
      'rgb(251, 201, 141)', 'rgb(239, 129, 96)', 'rgb(219, 71, 106)', 'rgb(159, 47, 127)', 'rgb(94, 37, 124)'
    ];

    const pack = d3.pack()
        .size([width, height])
        .padding(1.5);

    const toolTip = d3.select('#bubbleChart').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      const root = d3.hierarchy({
        children: data
      })
          .sum(function (d) {
            return d.VALUE;
          })
          .each(function (d) {
            d.class = d.data.CLASS;
            d.count = d.data.VALUE;
          });

      // ----- find max VALUE in csv for color defining
      data.forEach(function (d) {
        d.VALUE = +d.VALUE;
      });

      const max = d3.max(data, function (d) {
        return d.VALUE;
      });

      console.log('max', max);

      const range = (max + 1) / 5;
      // -----


      const node = d3.select(svg)
          .selectAll('.node')
          .data(pack(root).leaves())
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr('transform', function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

      node.append('circle')
          .attr('name', function (d) {
            return d.class;
          })
          .attr('r', 0)

          .attr('fill', function (d) {
            return colors[Math.floor(d.value / range)];
          })
          .transition().duration(2000)
          .attr('r', function (d) {
            return d.count;
          });


      node.on('mouseover', function (d) {
        toolTip.transition().duration(200).style('opacity', 1);
        toolTip.html("<b>" + d.class + "</b> <span>(" + d.value + ")</span>")
            .style('left', (d.x - 0) + 'px')
            .style('top', (d.y + d.value * 3 + 20) + 'px');
      })
          .on('mouseout', function (d) {
            toolTip.transition().duration(200).style('opacity', 0);

          });


  }

  render() {
    return <svg ref={node => this.node = node}
                width={500} height={600}>
    </svg>
  }
}

const stateMap = (state) => {
  return {
    classNames: state.classNames
  };
};

export default connect(stateMap)(Bubbles);

