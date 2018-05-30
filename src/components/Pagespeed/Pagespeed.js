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
      url: '',
    };
    this.validatePagespeed = this.validatePagespeed.bind(this);
    //this.createPieChart = this.createPieChart.bind(this);
    this.createPieChart2 = this.createPieChart2.bind(this);
  }

  componentDidMount() {
    this.validatePagespeed();
    if(this.state.pageStats != ''){
      this.createPieChart2();
    }
  }

  componentDidUpdate() {
    if (this.state.url != this.props.url) {
      document.getElementById('pagespeed-pie') ? document.getElementById('pagespeed-pie').innerHTML = '' : '';
      this.validatePagespeed();
    }
    if(this.state.pageStats != ''){
      this.createPieChart2();
    }

  }

  validatePagespeed(url) {

    this.setState({
      url: this.props.url,
    });

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
      this.props.dispatch(setPagespeeddata(this.state.response));

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
      this.props.dispatch(setPagespeeddataMobile(this.state.responseMobile));
    })
        .catch(err => {
          throw err
        });
  }




  createPieChart2(){

    document.getElementById('pagespeed-pie') ? document.getElementById('pagespeed-pie').remove() : '';

    //const svgNode = this.node;

    const width = 990,
        height = 600,
        radius = Math.min(450, 450) / 2;

    const svg = d3.select('#pie-div')
        .append('svg')
        .attr('id', 'pagespeed-pie')
        .attr('width',width)
        .attr('height', height)
        .append('g')
        .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

    svg.append("g")
        .attr("class", "slices");
    const textLabel = svg.append("g")
        .attr("class", "labelName");
    svg.append("g")
        .attr("class", "lines");



    const pie = d3.pie()
        .sort(null)
        .value(function(d) {
          return d.count;
        });

    const arc = d3.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);

    const outerArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

    const legendRectSize = radius * 0.05;
    const legendSpacing = radius * 0.02;

    let data = this.state.pageStats;

    console.log('kdjflajsdf data', data);

    const sortedData = data
        .sort((a, b) => {
          return (a.count > b.count) ? 1 : ((b.count < a.count) ? -1 : 0);
        });

    data = sortedData;
    console.log('sorted', sortedData);

    const slice = svg
        .select(".slices")
        .selectAll("path.slice")
        .data(pie(data), function(d){
          return d.data.label
        });

    slice.enter()
        .insert("path")
        .style("fill", function(d) { return d.data.color; })
        .style("opacity", 0.7)
        .attr("class", "slice")
        .attr("d", arc)
        .on('mouseover', function (d) {
          d3.select(this).style('opacity', 1);
        }).on('mouseout', function (d) {
          d3.select(this).style('opacity', 0.7);
        });


    //Labels

    let text = textLabel
        .selectAll('text')
        .data(pie(data), function (d) {
          return d.data.label
        });

    text.enter()
        .append('text')
        .attr('dy', '.35em')
        .text(function(d){
          return d.data.label+": "+d.value+" Bytes";
        })
        .attr('transform', function(d){

          let centroid = outerArc.centroid(d);
          let x = centroid[0] > 0 ? 250 : -250;
          let y = centroid[1] > 0 ? centroid[1]*1.2 : centroid[1]*1.2;

          return 'translate (' + x + ',' + y + ')';
        })
        .attr('text-anchor', function (d) {
          let centroid = outerArc.centroid(d);
          return centroid[0] > 0 ? 'start' : 'end';
        });

    //Lines

    let polyline = svg.select('.lines')
        .selectAll('polyline')
        .data(pie(data), function (d) {
          return d.data.label
        });

    polyline.enter()
        .append('polyline')
        .attr('points', function(d){

          let centroid = outerArc.centroid(d);
          let centroidArc = arc.centroid(d);

          let x1 = centroidArc[0];
          let y1 = centroidArc[1];

          let x2 = centroid[0];
          let y2 = centroid[1];

          let x3 = centroid[0] > 0 ? 230 : -230;
          let y3 = centroid[1] > 0 ? centroid[1]*1.2 : centroid[1]*1.2;

          return [x1 ,y1, x2, y2, x3, y3];
        });


  }



  render() {

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
        <div className="col-md-12" id="pie-div">
          <h5>Your Webpage ressources in bytes:</h5>
        </div>
      </div>);
    } else {
      return null;
    }
  }


}


const stateMap = (state) => {
  return {
    url: state.url,
    pagespeeddata: state.pagespeeddata,
  };
};

export default connect(stateMap)(Pagespeed);
