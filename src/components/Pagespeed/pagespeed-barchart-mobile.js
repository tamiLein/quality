import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class PagespeedchartMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.createBarchart = this.createBarchart.bind(this);
    this.createTooltip = this.createTooltip.bind(this);

  }

  componentDidUpdate() {
    if(this.props.pagespeeddatamobile){
      this.createBarchart();
    }

  }

  createBarchart() {
    let myData = [{
      "interest_rate": "SPEED",
      "Passed": 0,
      "AvoidLandingPageRedirects": this.props.pagespeeddatamobile.AvoidLandingPageRedirects.ruleImpact,
      "AvoidPlugins": this.props.pagespeeddatamobile.AvoidPlugins.ruleImpact,
      "ConfigureViewport": this.props.pagespeeddatamobile.ConfigureViewport.ruleImpact,
      "EnableGzipCompression": this.props.pagespeeddatamobile.EnableGzipCompression.ruleImpact,
      "LeverageBrowserCaching": this.props.pagespeeddatamobile.LeverageBrowserCaching.ruleImpact,
      "MainResourceServerResponseTime": this.props.pagespeeddatamobile.MainResourceServerResponseTime.ruleImpact,
      "MinifyCss": this.props.pagespeeddatamobile.MinifyCss.ruleImpact,
      "MinifyHTML": this.props.pagespeeddatamobile.MinifyHTML.ruleImpact,
      "MinifyJavaScript": this.props.pagespeeddatamobile.MinifyJavaScript.ruleImpact,
      "MinimizeRenderBlockingResources": this.props.pagespeeddatamobile.MinimizeRenderBlockingResources.ruleImpact,
      "OptimizeImages": this.props.pagespeeddatamobile.OptimizeImages.ruleImpact,
      "PrioritizeVisibleContent": this.props.pagespeeddatamobile.PrioritizeVisibleContent.ruleImpact,
      "SizeContentToViewport": this.props.pagespeeddatamobile.SizeContentToViewport.ruleImpact,
      "SizeTapTargetsAppropriately": this.props.pagespeeddatamobile.SizeTapTargetsAppropriately.ruleImpact,
      "UseLegibleFontSizes": this.props.pagespeeddatamobile.UseLegibleFontSizes.ruleImpact,
    }];

    //calculate score
    let score = 100;
    for(let index in myData[0]){
      if(typeof myData[0][index] != 'string') {
        score = score - myData[0][index];
      }
    }
    myData[0].Passed = score;


    // sort data set
    const list = myData[0];
    const sortedData = Object
        .keys(list)
        .sort((a, b) => list[b] - list[a])
        .reduce((_sortedObj, key) => ({
          ..._sortedObj, [key]: list[key]
        }), {});

    myData[0] = sortedData;

    //constants for chart
    const margin = {
          top: 20,
          right: 20,
          bottom: 40,
          left: 60
        },
        width = 750 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom,
        that = this;

    //define scale
    const x = d3.scaleOrdinal([0, 400], .3);
    const y = d3.scaleLinear().range([400, 0]);

    //define colors
    const colors = ['#fbc98d', '#ef8160', '#db476a', '#9f2f7f', '#5e257c', '#262150'];
    const color = d3.scaleOrdinal().range(colors);

    //define axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(10, ",%");

    //create svg element
    const svg = d3.select(".pagespeed-chart-mobile")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(d3.keys(myData[0]).filter(function(key) {
      return key !== "interest_rate";
    }));

    myData.forEach(function(d) {
      let y0 = 0;

      d.rates = color.domain().map(function(name) {
        return {
          name: name,
          y0: y0,
          y1: y0 += +d[name],
          amount: d[name]
        };
      });
      d.rates.forEach(function(d) {
        d.y0 /= y0;
        d.y1 /= y0;
      });
      console.log(myData);

    });


    x.domain(myData.map(function(d) {
      return d.interest_rate;
    }));

    //y axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    const interest_rate = svg.selectAll(".interest-rate")
        .data(myData)
        .enter()
        .append("g")
        .attr("class", "interest-rate")
        .attr("transform", function(d) {
          return "translate(" + 30 + ",0)";
        });

    // create bars
    interest_rate.selectAll("rect")
        .data(function(d) {
          return d.rates;
        })
        .enter()
        .append("rect")
        .attr("width", width / 4)
        .attr("y", function(d) {
          return y(d.y1);
        })
        .attr("height", function(d) {
          return y(d.y0) - y(d.y1);
        })
        .style("fill", function(d) {
         return color(d.name);
         })
        .attr('opacity', '0.3')
        .on('mouseover', function(d) {
          let rule = d.name;
          const charttip = d3.select(".chart-tip-mobile")
              .style('opacity', '1')
              .html('<div className="tip">' + that.createTooltip(rule) + '</div>');
        }).on('mouseout', function() {
      d3.select(".chart-tip-mobile").style('opacity', '0');
    });

    interest_rate.append("text")
        .attr("x", width / 4 / 2)
        .attr("y", height)
        .attr("width", x)
        .attr("class", "passed-lable")
        .attr("dy", "-.35em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .text(function(d) {
          return Math.ceil(myData[0].Passed);
        });


    // legend
    const legends = svg.append("g")
        .attr("class", "legends")
        .attr("transform", "translate(-150,0)");

    const legend = legends.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
          return "translate(-250, " + i * 20 + ")";
        })
        .attr("class", function(d, i) {
          let x = myData[0].rates[15 - i].amount;
          return x > 0 ? "show" : "hide";
        });

    legend.append("rect")
        .attr("x", width + -53)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);

    legend.append("text")
        .attr("x", width - 40)
        .attr("y", 5)
        .attr("width", 40)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
          return d;
        });

  }

  createTooltip(rule) {
    if (rule != "Passed") {

      const title = this.props.pagespeeddata[rule].localizedRuleName;
      const summary = 'summary' in this.props.pagespeeddata[rule] ? this.props.pagespeeddata[rule].summary.format : '';
      const help = 'summary' in this.props.pagespeeddata[rule] && 'args' in this.props.pagespeeddata[rule].summary ? this.props.pagespeeddata[rule].summary.args[0].value : '';
      const impact = this.props.pagespeeddata[rule].ruleImpact;
      const urlBlocks = 'urlBlocks' in this.props.pagespeeddata[rule] ? this.props.pagespeeddata[rule].urlBlocks[0].header.format : '';

      return ('<strong>' + title + '</strong><p>' + summary + '</p><p>' + help + '</p><p>' + impact + '</p><p>' + urlBlocks + '</p>');

    }else{
      return('you passed!');
    }
  }

  render() {
    return (
        <div id="pagespeed-barchart-mobile" className="col-md-12">
          <div className="pagespeed-chart-mobile col-md-6"></div>
          <div className="chart-tip-mobile col-md-6"></div>
        </div>

    );
  }
}



const stateMap = (state) => {
  return {
    url: state.url,
    pagespeeddata: state.pagespeeddata,
    pagespeeddatamobile: state.pagespeeddatamobile,
  };
};

export default connect(stateMap)(PagespeedchartMobile);
