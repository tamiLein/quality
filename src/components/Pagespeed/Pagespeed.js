import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';
import Barchart from './pagespeed-barchart';
import BarchartMobile from './pagespeed-barchart-mobile';
import {setPagespeeddata as setPagespeeddata} from './../../redux/actions';
import {setPagespeeddataMobile as setPagespeeddataMobile} from './../../redux/actions';

class Pagespeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'AIzaSyDM0KzbxUNHlR4GYSIkdAV_S-b2JzTDhSk',
      response: '',
      pageStats: '',
      responseMobile: '',
      pageStatsMobile: '',
    };
    this.validatePagespeed = this.validatePagespeed.bind(this);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.validatePagespeed();
  }

  validatePagespeed(url) {

    let pagespeedUrlMobile = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + this.props.url + '&strategy=mobile&key=' + this.state.key;
    let pagespeedUrl = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + this.props.url + '&strategy=desktop&key=' + this.state.key;

    fetch(pagespeedUrl)
        .then(res => res.json())
        .then((out) => {
          //console.log('out', out);
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
          this.props.dispatch(setPagespeeddata(this.state.response.formattedResults.ruleResults));

        })
        .then(() => {
          this.createPieChart();
        })
        .catch(err => {
          throw err
        });

    fetch(pagespeedUrlMobile)
        .then(res => res.json())
        .then((out) => {
          //console.log('out mobile', out);
          //console.log('out mobile', pagespeedUrlMobile);
          this.setState({
            responseMobile: out,
            pageStatsMobile: [
              {label: 'JavaScript', color: 'rgb(251, 201, 141)', count: out.pageStats.javascriptResponseBytes},
              {label: 'Images', color: 'rgb(239, 129, 96)', count: out.pageStats.imageResponseBytes},
              {label: 'CSS', color: 'rgb(219, 71, 106)', count: out.pageStats.cssResponseBytes},
              {label: 'HTML', color: 'rgb(159, 47, 127)', count: out.pageStats.htmlResponseBytes},
            ],
          })
        }).then(() => {
      this.props.dispatch(setPagespeeddataMobile(this.state.responseMobile.formattedResults.ruleResults));
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

    /*let ruleItems = [];

    if (this.state.response !== '') {

      const ruleResults = this.state.response.formattedResults.ruleResults;

      //console.log('ruleResults', ruleResults);

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
          //console.log('rule', rule);
          //console.log('test',rule.hasOwnProperty('summary') );
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
    }*/

    if (this.state.response !== '' && this.state.responseMobile !== '') {
      return (<div>
        {/*{ruleItems}*/}

        <div className="tabbable-panel">
          <div className="tabbable-line">
            <ul className="nav nav-tabs ">
              <li className="col-md-6 active">
                <a href="#tab_default_1" data-toggle="tab">
                  Desktop </a>
              </li>
              <li className="col-md-6">
                <a href="#tab_default_2" data-toggle="tab">
                  Mobile </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tab_default_1">
                <Barchart/>
              </div>
              <div className="tab-pane" id="tab_default_2">
                <BarchartMobile/>
              </div>
            </div>
          </div>
        </div>

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
    url: state.url,
    pagespeeddata: state.pagespeeddata,
  };
};

export default connect(stateMap)(Pagespeed);
