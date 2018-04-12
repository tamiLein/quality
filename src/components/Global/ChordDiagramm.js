import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';
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
  }

  /*componentDidMount() {
   this.createChord();
   }*/

  componentDidUpdate() {
    if (this.props.chordData !== '') {
      console.log('draw cord');
      this.createChord();
    }
  }

  createChord() {

    const toolTip = d3.select('#chordChart').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

    const toolTipCategory = d3.select('#chordChart').append('div')
        .attr('class', 'tooltip-category')
        .style('opacity', 0);


    const data = this.props.chordData;

    const mpr = chordMpr(data);
    mpr
        .addValuesToMap('root')
        .addValuesToMap('node')
        .setFilter(function (row, a, b) {
          //return (row.root === a.name && row.node === b.name);
          return (row.root === a.name && row.node === b.name);
        })
        .setAccessor(function (recs, a, b) {
          if (!recs[0]) return 0;

          //return +recs[0].count;
          return recs.length;
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
        .attr("class", "group");

    g.append("svg:path")
        .style("stroke", "grey")
        .attr("d", arc)
        .on('mouseover', function (g, i) {
          svg.selectAll("path.chord")
              .filter(function (d) {

                return d.source.index !== i && d.target.index !== i;
              })
              .transition()
              .style("opacity", .1);


          toolTipCategory.transition().duration(200).style('opacity', 1);
          toolTipCategory.html("<b>Info:</b> <br>" +
              "<span>There " + (mapReader(g).gvalue === 0 ? "is 1" : "are " + mapReader(g).gvalue) + " " + mapReader(g).gname + " Element(s) in the HTML source code</span>")
        })
        .on('mouseout', function (g, i) {
          svg.selectAll("path.chord ")
              .filter(function (d) {
                return d.source.index !== i && d.target.index !== i;
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
        .style("font-size", "15px")
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
                return d.source.index !== g.source.index || d.target.index !== g.target.index;
              })
              .transition()
              .style("opacity", .1);
          toolTip.transition().duration(200).style('opacity', 1);

          toolTip.html("<b>Info:</b> <br>" +
              "<span>There are " + g.source.value + "  " + mapReader(g).sname + " in " + mapReader(g).tname + " Elements. " +
              "<br>There are " + g.target.value + "  " + mapReader(g).tname + " in " + mapReader(g).sname + " Elements." +
              "</span>")

          //.style('left', (d.x - 20) + 'px')
          //.style('top', (d.y + d.value * 3 + 20) + 'px')
          ;
        })
        .on('mouseout', function (g, i) {
          svg.selectAll("path.chord ")
              .filter(function (d) {
                return d.source.index !== g.source.index || d.target.index !== g.target.index;
              })
              .transition()
              .style("opacity", 1);
          toolTip.transition().duration(200).style('opacity', 0);
        });
  }


  render() {
    return ( <div>
          <h5>Relations between HTML Elements:</h5>

        </div>
    );
  }
}

const stateMap = (state) => {
  return {
    chordData: state.chordData
  };
};

export default connect(stateMap)(ChordDiagramm);
