/**
 * Created by adam on 16/7/25.
 */


var width = 1200, height = 700;
var svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

var projection = d3.geo.mercator()
    .center([107, 38]).scale(850).translate([width / 2, height / 2]);

var path = d3.geo.path().projection(projection);

d3.json('china.geojson', function(error, root) {

    if(error) {
        return console.log(error);
    }

    svg.selectAll('path').data(root.features).enter().append('path')
        .attr('stroke', '#000').attr('stroke-width', 1).attr('fill', function(data, index) {
            return color(index);
        })
        .attr('d', path)
        .on('mouseover', function() {
            d3.select(this).attr('fill', 'yellow');
        })
        .on('mouseout', function(data, index) {
            d3.select(this).attr('fill', color(index));
        })
});

var color = d3.scale.category20();