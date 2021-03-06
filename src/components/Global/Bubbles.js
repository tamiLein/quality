import {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class Bubbles extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      url: '',
      length: 0,
    });

    this.createBubbles = this.createBubbles.bind(this);
  }

  componentDidUpdate() {
    if (this.props.classNames.length > this.state.length) {
      this.createBubbles();
    }
    if (this.props.url !== this.state.url) {
      this.createBubbles();
    }
  }

  createBubbles() {

    this.setState({
      length: this.props.classNames.length,
      url: this.props.url,
    });

    document.getElementById('bubbleSVG') ? document.getElementById('bubbleSVG').remove() : '';

    const width = 500;
    const height = 500;

    const data = this.props.classNames;

    const colors = [
      'rgb(251, 201, 141)', 'rgb(239, 129, 96)', 'rgb(219, 71, 106)', 'rgb(159, 47, 127)', 'rgb(94, 37, 124)'
    ];

    const pack = d3.pack(data)
        .size([width, height])
        .padding(1.5);

    d3.select('#bubbleChart').append('div')
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

    const range = (max + 1) / 5;
    // -----


    d3.select('#bubbleChart')
        .append('svg')
        .attr('id', 'bubbleSVG')
        .attr('width', width)
        .attr('height', height);

    const node = d3.select('#bubbleSVG')
        .selectAll('.node')
        .data(pack(root).leaves())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', function (d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });

    node.append('circle')
        .attr('name', function (d) {
          return d.class;
        })
        .attr('r', 0)
        .attr('class', function (d) {
          return 'class-' + d.class;
        })
        .attr('fill', function (d) {
          return colors[Math.floor(d.value / range)];
        })
        .transition().duration(2000)
        .attr('r', function (d) {
          return d.r;
        });

    node.append('text')
        .attr('dy', '-0.2em')
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.count;
        })
        .attr('font-size', function (d) {
          return d.r / 2;
        })
        .attr('fill', 'white');

    node.append('text')
        .attr('dy', '1.3em')
        .style('text-anchor', 'middle')
        .text(function (d) {
          return d.class;
        })

        .attr('font-size', function (d) {
          return d.r / 4;
        })
        .attr('fill', 'white');


    node.on('mouseover', function (d) {
      let elements = document.getElementsByClassName('class-' + d.class);
      elements[0].classList.add('active');
      elements[1].classList.add('active');
    })
        .on('mouseout', function (d) {
          //toolTip.transition().duration(200).style('opacity', 0);
          let elements = document.getElementsByClassName('class-' + d.class);
          elements[0].classList.remove('active');
          elements[1].classList.remove('active');
        });


  }

  render() {
    return null;
  }
}

const stateMap = (state) => {
  return {
    classNames: state.classNames,
    url: state.url,
  };
};

export default connect(stateMap)(Bubbles);

