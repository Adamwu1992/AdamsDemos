/**
 * Created by adam on 16/5/12.
 */
$(function() {
    /*var div = document.getElementById('editor');
    var editor = new Squire( div, {
        blockTag: 'p',
        blockAttributes: {'class': 'paragraph'},
        tagAttributes: {
            ul: {'class': 'UL'},
            ol: {'class': 'OL'},
            li: {'class': 'listItem'},
            a: {'target': '_blank'}
        }
    });*/

    /*document.addEventListener('click', function (e) {
        var id = e.target.id,
            value;
        if (id && editor && editor[id]) {
            if (e.target.className === 'prompt') {
                value = prompt('Value:');
            }
            editor[id](value);
        }
    }, false );*/

    var shiftKey = false;
    $('body').on('click', '.test', function() {
        //console.log($('#editor').find('p')[0]);
        var html = '<span style="color:red">hello</span>';
        var blank = '<span>&nbsp;</span>';
        $('.paragraph:last').append(html);
        $('.paragraph:last').append(blank);
    }).on('click', '.getv', function() {
        var $div = $('#editor'),
            value = '';
        $div.find('.paragraph').each(function() {
            value += $(this).text();
        })
        console.log(value);
    }).on('keydown', '#editor', function() {
        if (event.keyCode == 16) {
            shiftKey = true;
            setTimeout(function () {
                shiftKey = false;
            }, 500);
        }
    }).on('keyup', '#editor', function() {
        if (event.keyCode == 50 && (shiftKey || event.shiftKey)) {
            shiftKey = false;
            var html = '<span style="color:red">hello</span>';
            var blank = '<span>&nbsp;</span>';
            $('.paragraph:last').append(html);
            $('.paragraph:last').append(blank);
        }
    })
})


