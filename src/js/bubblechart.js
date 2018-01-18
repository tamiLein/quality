import * as d3 from 'd3';

const svg = d3.select('#svg-bubbles');
const width = +svg.attr("width");
const height = +svg.attr("height");

const colors = [
  'rgb(251, 201, 141)', 'rgb(239, 129, 96)', 'rgb(219, 71, 106)', 'rgb(159, 47, 127)', 'rgb(94, 37, 124)'
];


console.log(colors);

const pack = d3.pack()
    .size([width, height])
    .padding(1.5);

const toolTip = d3.select('#bubbleChart').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


d3.json('../json/classnames.json', function(error, data) {
  if (error) throw error;

  console.log('data: ', data);

  const root = d3.hierarchy({
    children: data
  })
      .sum(function(d) {
        return d.VALUE;
      })
      .each(function(d) {
        d.class = d.data.CLASS;
        d.count = d.data.VALUE;
      });

  // ----- find max VALUE in csv
  data.forEach(function(d) {
    d.VALUE = +d.VALUE;
  });

  const max = d3.max(data, function(d) {
    console.log('d', d);
    return d.VALUE;
  });

  const range = (max + 1) / 5;
  // -----


  const node = svg.selectAll('.node')
      .data(pack(root).leaves())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

  node.append('circle')
      .attr('name', function(d) {
        return d.class;
      })
      .attr('r', function(d) {
        return d.count * 3;
      })
      .attr('fill', function(d) {
        return colors[Math.floor(d.value / range)];
      });


  node.on('mouseover', function(d) {
    toolTip.transition().duration(200).style('opacity', 1);
    toolTip.html("<b>" + d.class + "</b> <span>(" + d.value + ")</span>")
        .style('left', (d.x - 20) + 'px')
        .style('top', (d.y + d.value * 3 + 20) + 'px');
  })
      .on('mouseout', function(d) {
        toolTip.transition().duration(200).style('opacity', 0);

      });

});
