import React, {Component} from 'react';
import * as d3 from 'd3';

class Pagespeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://www.biohof-sadleder.at/',
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

    let pagespeedUrl = 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + this.state.url + '&strategy=mobile&key=' + this.state.key;
    console.log('pagespeed url', pagespeedUrl);

    fetch(pagespeedUrl)
        .then(res => res.json())
        .then((out) => {
          console.log('Checkout this JSON! ', out);

          this.setState({
            response: out,
            pageStats: [
              {label: 'JavaScript', color: 'rgb(251, 201, 141)', count: out.pageStats.javascriptResponseBytes},
              {label: 'Images', color: 'rgb(239, 129, 96)', count: out.pageStats.imageResponseBytes},
              {label: 'CSS', color: 'rgb(219, 71, 106)',count: out.pageStats.cssResponseBytes},
              {label: 'HTML', color: 'rgb(159, 47, 127)', count: out.pageStats.htmlResponseBytes},

            ],
          })
        }).then(() => {
      console.log('testi', this.state.pageStats);
            this.createPieChart();
        })
        .catch(err => {
          throw err
        });
  }


  createPieChart() {
    const svg = this.node;
    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;
    const g = d3.select(svg).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const colors = [
      'rgb(251, 201, 141)', 'rgb(239, 129, 96)', 'rgb(219, 71, 106)', 'rgb(159, 47, 127)', 'rgb(94, 37, 124)'
    ];

    var color = d3.scaleOrdinal(["rgb(251, 201, 141)", "rgb(239, 129, 96)", "rgb(219, 71, 106)", "rgb(159, 47, 127)", "rgb(94, 37, 124)"]);

    //console.log('svg', svg);
    //console.log('width', width);
    //console.log('height', height);

    const pie = d3.pie()
        .sort(null)
        .value(function (d) {
          return d.count;
        });

    const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(100);

    const label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 140);

    /*d3.json(this.state.pageStats, function (error, data) {
      console.log('read data');
      if (error) {
        console.log('error', error.currentTarget.responseText);
      }*/

      const data = this.state.pageStats;

      console.log('data: ', data);

      const arc = g.selectAll(".arc")
          .data(pie(data))
          .enter().append("g")
          .attr("class", "arc");

      arc.append("path")
          .attr("d", path)
          .attr("fill", function (d) {
            console.log('color', d.data.color);
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

   // });
  }

  render() {

    return <svg ref={node => this.node = node}
                width={500} height={500}>
    </svg>
  }
}

export default Pagespeed;
