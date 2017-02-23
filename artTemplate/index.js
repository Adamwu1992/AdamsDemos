/**
 * Created by adam on 16/9/9.
 */



var Template = {

    data: [
        {
            'title': '杂书馆序',
            'time': '20150218',
            'data': [
                {'key': '壹', 'value': '已未十月，止于大雪'},
                {'key': '贰', 'value': '同月，于京郊，于天之角'},
                {'key': '叁', 'value': '余年少时，自诩文青翘楚'}
            ]
        },
        {'title': '滕王阁序', 'time': '10150218', 'data': []},
        {'title': '岳阳楼记', 'time': '06150218', 'data': []}
    ],

    init: function() {
        var html = '', list = this.data;
        $.each(list, function(index, obj) {
            console.log(index + ' - ' + template('test', obj));
            html += template('test', obj);
        });

        $('#container').append(html);
    }
};


template.helper('formatTime', function(time) {
    var args = time.match(/^(.{4})(.{2})(.{2})/);
    return args[1] + '年' + args[2] + '月' + args[3] + '日';
});

template.helper('formatData', function (data) {
    var html = '';
    $.each(data, function(index, obj) {
        html += template('content', obj);
    });
    return html;
});


$(function() {

    Template.init();

    console.log('0123'.match(/^0(.*)$/));

});