import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

class Pagespeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'AIzaSyDM0KzbxUNHlR4GYSIkdAV_S-b2JzTDhSk',
      response: '',
      pageStats: '',
    };
    this.validatePagespeed = this.validatePagespeed.bind(this);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentWillMount() {
    this.validatePagespeed();
  }

  validatePagespeed(url) {

    let pagespeedUrl = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + this.props.url + '&strategy=mobile&key=' + this.state.key;

    fetch(pagespeedUrl)
        .then(res => res.json())
        .then((out) => {
          console.log('out', out);
          this.setState({
            response: out,
            pageStats: [
              {label: 'JavaScript', color: 'rgb(251, 201, 141)', count: out.pageStats.javascriptResponseBytes},
              {label: 'Images', color: 'rgb(239, 129, 96)', count: out.pageStats.imageResponseBytes},
              {label: 'CSS', color: 'rgb(219, 71, 106)', count: out.pageStats.cssResponseBytes},
              {label: 'HTML', color: 'rgb(159, 47, 127)', count: out.pageStats.htmlResponseBytes},
            ],
          })
        }).then(() => {
      this.createPieChart();
    })
        .catch(err => {
          throw err
        });
  }


  createPieChart() {
    const svg = this.node;
    const width = 300;
    const height = 300;
    const radius = (Math.min(width, height) - 40 ) / 2;
    const g = d3.select(svg).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    const pie = d3.pie()
        .sort(null)
        .value(function (d) {
          return d.count;
        });

    const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(40);

    const label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 0);

    const data = this.state.pageStats;

    const arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) {
          return d.data.color;
        });

    arc.append("text")
        .attr("transform", function (d) {
          return "translate(" + label.centroid(d) + ")";
        })
        .attr("dy", "0.35em")
        .text(function (d) {
          return d.data.label;
        });
  }

  render() {

    let ruleItems = [];

    if (this.state.response !== '') {

      const ruleResults = this.state.response.formattedResults.ruleResults;

      console.log('ruleResults', ruleResults);

      ruleItems.push(
          <div className='error col-md-12' key="score">
            <div className="col-md-12">
              <span className="errorType">Score: {this.state.response.ruleGroups.SPEED.score}</span>

            </div>
          </div>
      )

      //add rules
      let rule = '';
      for (let key in ruleResults) {
        if(ruleResults[key].ruleImpact > 0) {
          rule = ruleResults[key];
          console.log('rule', rule);
          console.log('test',rule.hasOwnProperty('summary') );
          if(rule.hasOwnProperty('summary')) {
            ruleItems.push(
                <div className='error col-md-12' key={key}>
                  <div className="col-md-12">
                    <span className="errorType">[{ruleResults[key].groups[0]}] {ruleResults[key].localizedRuleName}</span>
                    <p className="errorMessage">{ruleResults[key].summary.format}</p>
                    <p>Rule impact: {ruleResults[key].ruleImpact}</p>
                  </div>
                </div>
            )
          }
          else if(rule.hasOwnProperty('urlBlocks')) {
            ruleItems.push(
                <div className='error col-md-12' key={key}>
                  <div className="col-md-12">
                    <span className="errorType">[{ruleResults[key].groups[0]}] {ruleResults[key].localizedRuleName}</span>
                    <p className="errorMessage">{ruleResults[key].urlBlocks[0].header.format}</p>
                    <p>Rule impact: {ruleResults[key].ruleImpact}</p>
                  </div>
                </div>
            )
          }
        }
      }
    }

    if (ruleItems !== '') {
      return (<div>
        {ruleItems}
        <svg ref={node => this.node = node}
             width={300} height={300}>
        </svg>
      </div>);
    } else {
      return null;
    }
  }

  /*return <svg ref={node => this.node = node}
   width={300} height={300}>
   </svg>*/
}


const stateMap = (state) => {
  return {
    url: state.url
  };
};

export default connect(stateMap)(Pagespeed);
