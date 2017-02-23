/**
 * Created by adam on 16/7/25.
 */


/*
* 饼状图
**/
var dataset = [30, 10, 43, 55, 13];

var pie = d3.layout.pie();

var piedata = pie(dataset);

var outerRadius = 150, innerRadius = 0;
var arc = d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius);

var svg = d3.select('body').append('svg').attr('width', 600).attr('height', 600);

var arcs = svg.selectAll('g').data(piedata).enter().append('g').attr('transform', 'translate(300, 300)');

var color = d3.scale.category10();

arcs.append('path')
    .attr('fill', function(data, index) {
        return color(index);
    })
    .attr('d', function(data, index) {
        return arc(data);
    });

arcs.append('text')
    .attr('transform', function(data, index) {
        return 'translate(' + arc.centroid(data) + ')';
    })
    .attr('text-anchor', 'middle')
    .text(function(data) {
        return data.value;
    });


/*
* 力导向图
**/
var width = 600, height = 600;
var svg2 = d3.select('body').append('svg').attr('width', width).attr('height', height);
var color2 = d3.scale.category20();

var nodes = [
    {name: "长沙"}, {name: "广州"}, {name: "上海"}, {name: "重庆"}, {name: "成都"}, {name: "北京"},
    {name: "杭州"}
];
var edges = [
    {source: 0, target: 1}, {source: 0, target: 2}, {source: 0, target: 3}, {source: 1, target: 4},
    {source: 1, target: 5}, {source: 2, target: 6}
];

var force = d3.layout.force().nodes(nodes).links(edges).size([width, height])
    .linkDistance(150)
    .charge([-400]);

var svg_edges = svg2.selectAll('line').data(edges).enter().append('line').style('stroke', '#ccc')
    .attr('stroke-width', 1);
var svg_nodes = svg2.selectAll('circle').data(nodes).enter().append('circle').attr('r', 20)
    .style('fill', function(data, index) {
        return color(index);
    })
    .call(force.drag);
var svg_texts = svg2.selectAll('text').data(nodes).enter().append('text').style('fill', 'black')
    .attr('dx', -10).attr('dy', 5).text(function(data, index) {
        return data.name;
    }).call(force.drag());

force.on('tick', function() {

    svg_edges.attr('x1', function(data) {
        return data.source.x;
    }).attr('y1', function(data) {
        return data.source.y;
    }).attr('x2', function(data) {
        return data.target.x;
    }).attr('y2', function (data) {
        return data.target.y;
    });

    svg_nodes.attr('cx', function(data) {
        return data.x;
    }).attr('cy', function(data) {
        return data.y;
    });

    svg_texts.attr('x', function (data) {
        return data.x;
    }).attr('y', function(data) {
        return data.y;
    });

});

force.start();