import React, {Component} from 'react';
import * as d3 from 'd3';
import chordRdr from '../../js/chordRdr';
import chordMpr from '../../js/chordMpr';

class ChordDiagramm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matrix: '',
      map: '',
    };
    this.createChord = this.createChord.bind(this);
    this.drawChords = this.drawChords.bind(this);
  }

  componentDidMount() {
    this.createChord();
  }

  componentDidUpdate() {
    this.createChord();
  }

  createChord() {


    d3.json('./json/chord_v4_data.json', function (error, data) {

      if (error) {
        console.log('error', error.currentTarget.responseText);
      }

      const mpr = chordMpr(data);
      mpr
          .addValuesToMap('root')
          .addValuesToMap('node')
          .setFilter(function (row, a, b) {
            return (row.root === a.name && row.node === b.name)
          })
          .setAccessor(function (recs, a, b) {
            if (!recs[0]) return 0;
            return +recs[0].count;
          });

      const matrix = mpr.getMatrix();
      const mmap = mpr.getMap();

      const w = 980,
          h = 800,
          r1 = h / 2,
          r0 = r1 - 110;

      const chord = d3.chord()
          .padAngle(0.05)
          .sortSubgroups(d3.descending)
          .sortChords(d3.descending);

      const arc = d3.arc()
          .innerRadius(r0)
          .outerRadius(r0 + 20);

      const ribbon = d3.ribbon()
          .radius(r0);


      const svg = d3.select("#chordChart").append("svg:svg")
          .attr("width", w)
          .attr("height", h)
          .append("svg:g")
          .attr("id", "circle")
          .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
          .datum(chord(matrix));

      svg.append("circle")
          .attr("r", r0 + 20)
          .attr("fill", "white");

      const mapReader = chordRdr(matrix, mmap);


      const g = svg.selectAll("g.group")
          .data(function (chords) {
            return chords.groups;
          })
          .enter().append("svg:g")
          .attr("class", "group")

      g.append("svg:path")
          .style("stroke", "grey")
          .style("fill", function (d) {
            return mapReader(d).gdata;
          })
          .attr("d", arc)
          .on('mouseover', function (g, i) {
            svg.selectAll("path.chord")
                .filter(function (d) {

                  return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", .1);
          })
          .on('mouseout', function (g, i) {
            svg.selectAll("path.chord ")
                .filter(function (d) {
                  return d.source.index != i && d.target.index != i;
                })
                .transition()
                .style("opacity", 1);

          });

      g.append("svg:text")
          .each(function (d) {
            d.angle = (d.startAngle + d.endAngle) / 2;
          })
          .attr("dy", ".35em")
          .style("font-family", "helvetica, arial, sans-serif")
          .style("font-size", "9px")
          .attr("text-anchor", function (d) {
            return d.angle > Math.PI ? "end" : null;
          })
          .attr("transform", function (d) {
            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")" +
                "translate(" + (r0 + 26) + ")" +
                (d.angle > Math.PI ? "rotate(180)" : "");
          })
          .text(function (d) {
            return mapReader(d).gname;
          });

      const colors = d3.scaleOrdinal()
      //.domain(["New York", "San Francisco", "Austin"])
          .range(["#fbc98d", "#ef8160", "#db476a", "#9f2f7f", "#5e257c", "#262150"]);

      const chordPaths = svg.selectAll("path.chord")
          .data(function (chords) {
            return chords;
          })
          .enter().append("svg:path")
          .attr("class", "chord")
          .attr("index", function (d) {
            return d.source.index;
          })
          //.style("stroke", "grey")
          .style("fill", function (d, i) {
            return colors(i)
          })
          .attr("d", ribbon.radius(r0))
          .on('mouseover', function (g, i) {
            svg.selectAll("path.chord")
                .filter(function (d) {
                  return d.source.index != g.source.index || d.target.index != g.target.index;
                })
                .transition()
                .style("opacity", .1);
          })
          .on('mouseout', function (g, i) {
            svg.selectAll("path.chord ")
                .filter(function (d) {
                  return d.source.index != g.source.index || d.target.index != g.target.index;
                })
                .transition()
                .style("opacity", 1);

          });


    });
  }

  drawChords(matrix, mmap) {


  }


  render() {
    return ( <div>
          <h5>Relations between HTML Elements:</h5>

        </div>
    );
  }
}

export default ChordDiagramm;
