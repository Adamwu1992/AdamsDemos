/**
 * Created by adam on 16/5/13.
 */
$(function() {
    var $text = $('#text'), $width = $('#width');
    $('body').on('click', '#getv', function() {
        var value = '';
        value = $text.text();
        console.log(value);
    }).on('click', '#setv', function() {
        var value = $('#input').val();
        $('.width').text(value);

        var width = value.length * 12;
        var html = '<input class="input-button" value="'+ value +'" style="width:' + width + 'px"/>'
        $text.append(html);
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
    }).on('click', '.input-button', function() {
        console.log('click');
    }).on('valueChanged', '.input-button', function() {
        console.log('change');
    })
})