import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class Pagespeedchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'passed' : '',
    };
    this.createBarchart = this.createBarchart.bind(this);
    this.createTooltip = this.createTooltip.bind(this);
  }

  componentDidUpdate() {
    if (this.props.pagespeeddata) {
      this.createBarchart();
    }

  }

  createBarchart() {
    let myData = [{
      "interest_rate": "SPEED",
      "Passed": 0,
      "AvoidLandingPageRedirects": this.props.pagespeeddata.AvoidLandingPageRedirects.ruleImpact,
      "EnableGzipCompression": this.props.pagespeeddata.EnableGzipCompression.ruleImpact,
      "LeverageBrowserCaching": this.props.pagespeeddata.LeverageBrowserCaching.ruleImpact,
      "MainResourceServerResponseTime": this.props.pagespeeddata.MainResourceServerResponseTime.ruleImpact,
      "MinifyCss": this.props.pagespeeddata.MinifyCss.ruleImpact,
      "MinifyHTML": this.props.pagespeeddata.MinifyHTML.ruleImpact,
      "MinifyJavaScript": this.props.pagespeeddata.MinifyJavaScript.ruleImpact,
      "MinimizeRenderBlockingResources": this.props.pagespeeddata.MinimizeRenderBlockingResources.ruleImpact,
      "OptimizeImages": this.props.pagespeeddata.OptimizeImages.ruleImpact,
      "PrioritizeVisibleContent": this.props.pagespeeddata.PrioritizeVisibleContent.ruleImpact
    }];

    //calculate score
    let score = 100;
    for (let index in myData[0]) {
      if (typeof myData[0][index] != 'string') {
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
        //height = 450 - margin.top - margin.bottom,
        height = 550 - margin.top - margin.bottom,
        that = this;

    //define scale
    const x = d3.scaleOrdinal([0, 300], .3);
    const y = d3.scaleLinear().range([500, 0]);

    //define colors
    const colors = ['#fbc98d', '#ef8160', '#db476a', '#9f2f7f', '#5e257c', '#262150'];
    const color = d3.scaleOrdinal().range(colors);

    //define axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(10, ",%");

    //create svg element
    const svg = d3.select(".pagespeed-chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color.domain(d3.keys(myData[0]).filter(function (key) {
      return key !== "interest_rate";
    }));

    myData.forEach(function (d) {
      let y0 = 0;

      d.rates = color.domain().map(function (name) {
        return {
          name: name,
          y0: y0,
          y1: y0 += +d[name],
          amount: d[name]
        };
      });
      d.rates.forEach(function (d) {
        d.y0 /= y0;
        d.y1 /= y0;
      });
      console.log(myData);

    });


    x.domain(myData.map(function (d) {
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
        .attr("transform", function (d) {
          return "translate(" + 20 + ",0)";
        });

    // create bars
    interest_rate.selectAll("rect")
        .data(function (d) {
          return d.rates;
        })
        .enter()
        .append("rect")
        .attr("width", width / 5)
        .attr("y", function (d) {
          return y(d.y1);
        })
        .attr("height", function (d) {
          return y(d.y0) - y(d.y1);
        })
        .style("fill", function (d) {
          return color(d.name);
        })
        .attr('opacity', '0.3')
        .on('mouseover', function (d) {
          let rule = d.name;
          const charttip = d3.select(".chart-tip")
              .style('opacity', '1')
              .html('<div className="tip">' + that.createTooltip(rule) + '</div>');

        }).on('mouseout', function () {
      //d3.select(".chart-tip").style('opacity', '0');
    });

    interest_rate.append("text")
        .attr("x", width / 5 / 2)
        .attr("y", height)
        .attr("width", x)
        .attr("class", "passed-lable")
        .attr("dy", "-.35em")
        .style("text-anchor", "middle")
        .style("fill", "white")
        .text(function (d) {
          return Math.ceil(myData[0].Passed);
        });


    // legend
    const legends = svg.append("g")
        .attr("class", "legends")
        .attr("transform", "translate(-200,0)");

    const legend = legends.selectAll(".legend")
        .data(color.domain().slice().reverse())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          return "translate(-250, " + i * 20 + ")";
        })
        .attr("class", function (d, i) {
          let x = myData[0].rates[10 - i].amount;
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
        .text(function (d) {
          return d;
        });

  }

  createTooltip(rule) {
    if (rule != "Passed") {

      const title = this.props.pagespeeddata[rule].localizedRuleName;
      const summary = 'summary' in this.props.pagespeeddata[rule] ? this.props.pagespeeddata[rule].summary.format : '';
      const help = 'summary' in this.props.pagespeeddata[rule] && 'args' in this.props.pagespeeddata[rule].summary ? this.props.pagespeeddata[rule].summary.args[0].value : '';
      const impact = this.props.pagespeeddata[rule].ruleImpact;
      const urlBlocks = 'urlBlocks' in this.props.pagespeeddata[rule] ? this.props.pagespeeddata[rule].urlBlocks[this.props.pagespeeddata[rule].urlBlocks.length-1].header : '';
      const urlBlocksUrls = 'urls' in this.props.pagespeeddata[rule].urlBlocks[this.props.pagespeeddata[rule].urlBlocks.length-1] ? this.props.pagespeeddata[rule].urlBlocks[this.props.pagespeeddata[rule].urlBlocks.length-1].urls : '';

      let urlBlocksFormat  = '';
      let urls = '';

      if(urlBlocks !== '' ){
        urlBlocksFormat = urlBlocks.format;
        for(let i = 0; i < urlBlocks.args.length; i++){
          if(urlBlocks.args[i].key === 'LINK'){
            urlBlocksFormat = urlBlocksFormat.replace('{{BEGIN_LINK}}', '<a href="' + urlBlocks.args[i].value + '" target="_blank">');
            urlBlocksFormat = urlBlocksFormat.replace('{{END_LINK}}', '</a>');
          }
          urlBlocksFormat = urlBlocksFormat.replace('{{' + urlBlocks.args[i].key + '}}', urlBlocks.args[i].value);
        }

      }

      if(urlBlocksUrls !== ''){

        for(let i = 0; i < urlBlocksUrls.length; i++){
          urls += urlBlocksUrls[i].result.format + '<br>';
          for(let j = 0; j < urlBlocksUrls[i].result.args.length; j++){
            urls = urls.replace('{{' + urlBlocksUrls[i].result.args[j].key + '}}', urlBlocksUrls[i].result.args[j].value)
          }
        }

      }

      return ('<strong>' + title + '</strong><p>' + summary + '</p><p>Impact: ' + impact + '</p><p>' + urlBlocksFormat + '</p><small>' + urls + '</small>');

    }else{
      return('you passed!');
    }
  }

  render() {
    return (
        <div id="pagespeed-barchart" className="col-md-12">
          <div className="pagespeed-chart col-md-6"></div>
          <div className="chart-tip col-md-6"></div>
        </div>
    );
  }
}


const stateMap = (state) => {
  return {
    url: state.url,
    pagespeeddata: state.pagespeeddata,
  };
};

export default connect(stateMap)(Pagespeedchart);
