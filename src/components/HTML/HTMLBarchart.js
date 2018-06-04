import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class HTMLBarchart extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.createBarchart = this.createBarchart.bind(this);

  }

  componentDidMount() {
    if (this.props.warningTypes !== "" || this.props.errorTypes !== '') {
      this.createBarchart();
    }
  }

  componentDidUpdate() {
    if (this.props.warningTypes !== "" || this.props.errorTypes !== '') {
      this.createBarchart();
    }
  }

  createBarchart() {
    let warningTypes = this.props.warningTypes;
    let errorTypes = this.props.errorTypes;
    let showError = this.props.errors;
    let showWarning = this.props.warnings;
    let data = [];
    let sum = 0;


    if (showError) {
      for (let prop in errorTypes) {
        sum = sum + errorTypes[prop];
        data.push({
          "name": prop.substring(0, 30) + "...",
          "value": errorTypes[prop]
        });
      }
    }
    if (showWarning) {
      for (let prop in warningTypes) {
        sum = sum + warningTypes[prop];
        data.push({
          "name": prop.substring(0, 30) + "...",
          "value": warningTypes[prop]
        });
      }
    }

    //sort bars based on value
    data = data.sort(function (a, b) {
      return d3.ascending(a.value, b.value);
    });

    const colors = ['rgb(239, 129, 96)', 'rgb(219, 71, 106)', 'rgb(159, 47, 127)'];
    let color = 0;
    let counter = 0;
    const sectionB = sum * 0.2;
    const sectionC = sum * 0.1;

    //set up svg using margin conventions - we'll need plenty of room on the left for labels
    const margin = {
      top: 15,
      right: 25,
      bottom: 15,
      left: 200
    };


    const width = 900 - margin.left - margin.right,
        height = (data.length * 30);

    document.getElementById('htmlBarChart') ? document.getElementById('htmlBarChart').remove() : '';

    let svg = d3.select("#graphic-html")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "htmlBarChart")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top - 5) + ")");

    let x = d3.scaleLinear()
        .range([0, width]);

    let y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    x.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);
    y.domain(data.map(function (d) {
      return d.name;
    }));

    // append the rectangles for the bar chart
    let bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g");

    bars.append("rect")
        .attr("class", "bar")
        //.attr("x", function(d) { return x(d.value); })

        .attr("y", function (d) {
          return y(d.name);
        })
        .attr("height", y.bandwidth())
        .attr('fill', function (d) {
          counter += d.value;
          if (counter > sectionC) {
            color = 1;
          }
          if (counter > sectionB) {
            color = 2;
          }
          return colors[color];
        })
        .attr("width", 0)
        .transition().duration(2000)
        .attr("width", function (d) {
          return x(d.value);
        });


    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr('id', 'yAxisHTML');

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function (d) {
          return y(d.name) + y.bandwidth() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function (d) {
          return x(d.value) + 3;
        })
        .text(function (d) {
          return d.value;
        });

  }


  render() {
    return (<div id="barchart-html">
      <h5>Pareto-Analyse HTML</h5>
      <div className="pareto-info">
        <p>This chart is divided into 3 areas:</p>
        <i className="section-pareto" id="sectionA"></i>
        <p>
          Section A includes 70% of the occured errors.
        </p>
        <i className="section-pareto" id="sectionB"></i>
        <p>
          Section B includes 20% of the occured errors.
        </p>
        <i className="section-pareto" id="sectionC"></i>
        <p>
          Section C includes 10% of the occured errors.
        </p>
        <p>Try to eliminate the errors from section A at first to get a visible improve of the page.</p>
      </div>
      <div id="graphic-html"></div>
    </div>);
  }
}

const stateMap = (state) => {
  return {
    htmlChartData: state.htmlChartData
  };
};

export default connect(stateMap)(HTMLBarchart);
