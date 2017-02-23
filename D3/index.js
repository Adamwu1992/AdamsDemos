/**
 * Created by adam on 16/7/21.
 */

function SimpleWidget(spec) {

    var instance = {};

    var headline, description, list, dataSet;

    instance.render = function() {

        /*
        * 渲染文本
        * */
        var div = d3.select('body').append('div');
        div.append('h3').text(headline);
        div.attr('class', 'box')
            .attr('style', 'color:' + spec.color)
            .append('p')
            .text(description);

        var ul = div.append('ul');
        for(var i = 0, l = list.length; i < l; i++) {
            ul.append('li').datum(list[i]);
        }
        d3.selectAll('li').text(function(data, index) {
            return '第' + index + '列的数据是：' + data;
        });


        /*
        * 渲染图标
        * */
        var svg = d3.select('body').append('svg').attr('width', 800).attr('height', 300),
            rectHeight = 20;

        //比例尺
        var linear = d3.scale.linear()
            .domain([0, d3.max(dataSet)])
            .range([0, 300]);

        svg.selectAll('rect')
            .data(dataSet)
            .enter()
            .append('rect')
            .attr('x', 20)
            .attr('y', function(data, index) {
                return index * rectHeight;
            }).attr('width', function(data, index) {
                return linear(data);
            }).attr('height', rectHeight - 2)
            .attr('fill', 'steelblue');

        //坐标轴
        var axis = d3.svg.axis()
            .scale(linear)
            .orient('bottom')
            .ticks(10);

        svg.append('g').attr('class', 'axis')
            .attr("transform","translate(20,230)").call(axis);


        /*
        * 坐标轴＋柱状图
        * */
        var width = 400, height = 400;
        var svg2 = d3.select('body').append('svg').attr('width', width).attr('height', height);

        var xScale = d3.scale.ordinal().domain(d3.range(dataSet.length)).rangeRoundBands([0, width - 40]);

        var yScale = d3.scale.linear().domain([0, d3.max(dataSet)]).range([height - 40, 0]);

        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');

        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        var rectPadding = 4;
        var rects = svg2.selectAll('.MyRect').data(dataSet).enter().append('rect')
            .attr('class', 'MyRect').attr('transform', 'translate(20, 20)')
            .attr('x', function(data, index) {
                return xScale(index) + rectPadding / 2;
            })
            .attr('y', function(data, index) {
                return yScale(data)
            })
            .attr('width', xScale.rangeBand() - rectPadding)
            .attr('height', function(data, index) {
                return height - 40 - yScale(data);
            })
            .attr('fill', 'steelblue');
        var texts = svg2.selectAll('.MyText').data(dataSet).enter().append('text')
            .attr('class', 'MyText')
            .attr('transform', 'translate(20, 20)')
            .attr('x', function(data, index) {
                return xScale(index) + rectPadding / 2 - 8;
            })
            .attr('y', function(data, index) {
                return yScale(data) - 25;
            })
            .attr('dx', (xScale.rangeBand() - rectPadding) / 2)
            .attr('dy', 20)
            .text(function(data, index) {
                return data;
            });

        svg2.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + 20 + ',' + (height - 20) + ')')
            .call(xAxis);
        svg2.append('g').attr('class', 'axis')
            .attr('transform', 'translate(20, 20)')
            .call(yAxis);

        return instance;
    };



    instance.headline = function(h) {

        if(!arguments.length)
            return headline;
        headline = h;

        return instance;
    };

    instance.description = function(d) {

        if(!arguments.length)
            return description;
        description = d;

        return instance;
    };

    instance.list = function(data) {

        if(!arguments.length)
            return list;
        list = data;

        return instance;
    };

    instance.dataSet = function(data) {

        if(!arguments.length)
            return dataSet;
        dataSet = data;

        return instance;
    };

    return instance;
}

var sWidget = SimpleWidget({color: "#6495ed"})

    .headline("Simple Widget")

    .description("This is a simple widget demonstrating functional javascript.")

    .list(['hello', 'greeting', 'rose', 'bulls'])

    .dataSet([120, 210, 17, 130, 0.9, 332, 50, 187, 21, 198])

    .render();




