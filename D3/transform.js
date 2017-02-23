/**
 * Created by adam on 16/7/25.
 */

/*
* 圆
**/
var svg1 = d3.select('body').append('svg').attr('width', 800).attr('height', 200);

var circle1 = svg1.append('circle').attr('cx', 100).attr('cy', 100).attr('r', 50).style('fill', 'green');
circle1.transition().duration(1000).delay(1000).attr('cx', 300).attr('r', 80).style('fill', 'red');

/*
* 柱形图
**/
var svg2 = d3.select('body').append('svg').attr('width', 800).attr('height', 600);

var dataset = [150, 100, 20, 9, 400, 692, 50, 800, 1000, 12.3, 976, 23, 554, 125, 742];

var xScale = d3.scale.ordinal().domain(d3.range(dataset.length)).rangeRoundBands([0, 800 - 20]);

var yScale = d3.scale.linear().domain([0, d3.max(dataset)]).range([580, 0]);

var padding = 10;

svg2.selectAll('rect').data(dataset).enter().append('rect')
    .attr('x', function(data, index) {
        return xScale(index) + padding / 2;
    })
    .attr('y', function(data, index) {
        /*var min = yScale.domain()[0];
        return yScale(min);*/
        return 600 - 20;
    })
    .attr('width', xScale.rangeBand() - padding)
    .attr('height', function(data, index) {
        return 1;
    })
    .attr('fill', 'green')
    .on('mouseover', function() {
        d3.select(this).attr('fill', 'steelblue');
    })
    .on('mouseout', function() {
        d3.select(this).attr('fill', 'green');
    })
    .transition()
    .ease('elastic')
    .delay(function(data, index) {
        return index * 200;
    })
    .duration(2000)
    .attr('y', function(data, index) {
        return yScale(data);
    })
    .attr('height', function(data, index) {
        return 600 - 20 - yScale(data);
    });

svg2.selectAll('text').data(dataset).enter().append('text')
    .attr('transform', 'translate(10, 10)')
    .attr('x', function(data, index) {
        return xScale(index) + padding / 2;
    })
    .attr('y', function(data, index) {
        return 600 - 10;
    })
    .text(function(data, index) {
        return data;
    });

